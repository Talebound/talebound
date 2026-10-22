import React, { useCallback, useEffect } from 'react';
import { $getNodeByKey, LexicalEditor, NodeKey } from 'lexical';
import { Col, Row } from '../../../Flex/Flex';
import { Button } from '../../../Button/Button';
import EditorImageModalTabUrl from './EditorImageModalTabUrl';
import ImageModalTabUpload from '../../../ImageModal/ImageModalTabUpload';
import ImageModalTabYourImages from '../../../ImageModal/ImageModalTabYourImages';
import { INSERT_INLINE_IMAGE_COMMAND } from '../../plugins/InlineImagePlugin';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../../../store';
import EditorImageAttributes from './EditorImageAttributes';
import { styled } from '../../../../styles/stitches.config';
import {
  imageModifyVariant,
  ImageVariant,
  isTaleboundCloudflareImage,
} from '../../../../utils/images/imageUtils';
import { TitleH4 } from '../../../Typography/Title';
import ImageVariantButtons from '../../../ImageVariantButtons/ImageVariantButtons';
import {
  resetInlineImagePayload,
  setSelectedVariantInEditor,
  updateInlineImagePayload,
} from './editorImageModalSlice';
import { EditorImageModalAction, EditorImageModalMode } from './editorImageModalLib';
import { InlineImageNode } from '../InlineImageNode/InlineImageNode';
import { AxiosResponse } from 'axios';
import { PbImage } from '../../../../generated/api-types/data-contracts';

enum ImageModalTabs {
  Url,
  Upload,
  YourImages,
}

export interface EditorImageModalContentProps {
  editor: LexicalEditor;
  mode?: EditorImageModalMode;
  nodeKey?: NodeKey;
  setOpen: (v: boolean) => void;
}

const PreviewImage = styled('img', {
  maxWidth: '1000px',
});

const EditorImageModalContent: React.FC<EditorImageModalContentProps> = ({
  editor,
  mode = EditorImageModalMode.Insert,
  nodeKey,
  setOpen,
}) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = React.useState(ImageModalTabs.Url);
  const payload = useSelector((state: ReduxState) => state.editorImageModal.inlineImagePayload);
  const selectedVariant = useSelector((state: ReduxState) => state.imageModal.selectedVariant);
  const [isCloudflareImage, setIsCloudflareImage] = React.useState(false);

  useEffect(() => {
    setIsCloudflareImage(isTaleboundCloudflareImage(payload.src));
  }, [payload.src]);

  const handleTabClick = useCallback((tab: ImageModalTabs) => {
    setActiveTab(tab);
  }, []);

  const handleUrlTabClick = useCallback(() => handleTabClick(ImageModalTabs.Url), [handleTabClick]);
  const handleUploadTabClick = useCallback(
    () => handleTabClick(ImageModalTabs.Upload),
    [handleTabClick],
  );
  const handleYourImagesTabClick = useCallback(
    () => handleTabClick(ImageModalTabs.YourImages),
    [handleTabClick],
  );

  const handleSubmit = useCallback(() => {
    if (mode === EditorImageModalMode.Update) {
      if (nodeKey) {
        const node = editor.getEditorState().read(() => $getNodeByKey(nodeKey) as InlineImageNode);
        if (node) {
          editor.update(() => {
            node.update(payload);
          });
        }
      }
    } else if (mode === EditorImageModalMode.Insert) {
      editor.dispatchCommand(INSERT_INLINE_IMAGE_COMMAND, payload);
    }
    dispatch(resetInlineImagePayload());
    setOpen(false);
  }, [mode, setOpen, nodeKey, payload, editor, dispatch]);

  const handleVariantChange = useCallback(
    (variant: ImageVariant) => {
      dispatch(setSelectedVariantInEditor(variant));
    },
    [dispatch],
  );

  useEffect(() => {
    if (isTaleboundCloudflareImage(payload.src) && selectedVariant) {
      const newUrl = imageModifyVariant(payload.src, selectedVariant);
      dispatch(updateInlineImagePayload({ src: newUrl }));
    }
  }, [selectedVariant, payload.src, dispatch]);

  const uploadImageSuccessCallback = useCallback(
    (data: AxiosResponse<PbImage>) => {
      if (data) {
        dispatch(
          updateInlineImagePayload({
            src: data.data.url,
          }),
        );
      }
    },
    [dispatch],
  );

  const yourImageClickedHandler = useCallback(
    (image: PbImage) => {
      dispatch(
        updateInlineImagePayload({
          src: image.url,
        }),
      );
    },
    [dispatch],
  );

  return (
    <Col gap="md" css={{ flexGrow: 1 }} onClick={(e) => e.stopPropagation()}>
      <Row gap="md">
        <Button
          color={activeTab === ImageModalTabs.Url ? 'primaryFill' : 'primaryOutline'}
          onClick={handleUrlTabClick}
        >
          Url
        </Button>
        <Button
          color={activeTab === ImageModalTabs.Upload ? 'primaryFill' : 'primaryOutline'}
          onClick={handleUploadTabClick}
        >
          Upload
        </Button>
        <Button
          color={activeTab === ImageModalTabs.YourImages ? 'primaryFill' : 'primaryOutline'}
          onClick={handleYourImagesTabClick}
        >
          Your images
        </Button>
      </Row>
      <hr />
      <Row gap="md" justifyContent="between" alignItems="start">
        {activeTab === ImageModalTabs.Url && <EditorImageModalTabUrl />}
        {activeTab === ImageModalTabs.Upload && (
          <ImageModalTabUpload
            onUpload={uploadImageSuccessCallback}
            filename="post-image"
            imageTypeId={100}
          />
        )}
        {activeTab === ImageModalTabs.YourImages && (
          <ImageModalTabYourImages
            onClick={yourImageClickedHandler}
            selectedImageByUrl={payload.src}
          />
        )}
        <Col gap="md">
          <EditorImageAttributes />
        </Col>
      </Row>
      <hr />
      {payload.src && (
        <Col gap="md" alignSelf="between">
          {isCloudflareImage && (
            <Row gap="md" alignItems="start">
              <TitleH4>Variants</TitleH4>
              <ImageVariantButtons selected={selectedVariant} onClick={handleVariantChange} />
            </Row>
          )}
          <TitleH4>Preview</TitleH4>
          <Row>
            <PreviewImage src={payload.src} alt={payload.altText} />
          </Row>
          <hr />
        </Col>
      )}
      <Row gap="md" alignSelf="end">
        <Button onClick={handleSubmit}>{EditorImageModalAction[mode]} image</Button>
      </Row>
    </Col>
  );
};

export default EditorImageModalContent;

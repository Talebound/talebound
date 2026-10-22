// noinspection JSUnusedGlobalSymbols

import { HttpClient } from '../generated/api-types/http-client';
import { Users } from '../generated/api-types/Users';
import { getApiUrl } from '../utils/functions/config';
import { Evaluations } from '../generated/api-types/Evaluations';
import { Posts } from '../generated/api-types/Posts';
import { Images } from '../generated/api-types/Images';
import { Worlds } from '../generated/api-types/Worlds';
import { Tags } from '../generated/api-types/Tags';
import { Menus } from '../generated/api-types/Menus';
import { Entities } from '../generated/api-types/Entities';
import { Maps } from '../generated/api-types/Maps';
import { Locations } from '../generated/api-types/Locations';
import { Modules } from '../generated/api-types/Modules';
import { Auth } from '../generated/api-types/Auth';
import { Fetcher } from '../generated/api-types/Fetcher';
import { fetcherInterceptor } from './fetcherInterceptor';
import { UserRoles } from '../generated/api-types/UserRoles';
import { Systems } from '../generated/api-types/Systems';
import { Characters } from '../generated/api-types/Characters';
import { Quests } from '../generated/api-types/Quests';

export const API = new HttpClient({
  baseURL: getApiUrl(),
});

API.instance.interceptors.request.use(
  (req) => req,
  (error) => {
    // eslint-disable-next-line no-console,@typescript-eslint/no-unsafe-member-access
    console.log(error.response);
    return Promise.reject(error);
  },
);

API.instance.interceptors.response.use(fetcherInterceptor);

export const AuthCollection = new Auth(API);
export const EntitiesCollection = new Entities(API);
export const EvaluationsCollection = new Evaluations(API);
export const FetcherCollection = new Fetcher(API);
export const ImagesCollection = new Images(API);
export const LocationsCollection = new Locations(API);
export const MapsCollection = new Maps(API);
export const MenusCollection = new Menus(API);
export const ModulesCollection = new Modules(API);
export const PostsCollection = new Posts(API);
export const TagsCollection = new Tags(API);
export const UsersCollection = new Users(API);
export const UserRolesCollection = new UserRoles(API);
export const WorldsCollection = new Worlds(API);
export const SystemsCollection = new Systems(API);
export const CharactersCollection = new Characters(API);
export const QuestsCollection = new Quests(API);

package servicecore

import (
	"context"
	db "github.com/the-medo/talebound-backend/db/sqlc"
)

// VisibleQuestCharacters exposes accepted participants publicly. Pending/declined
// applications and their letters are visible only to their character or quest managers.
func (core *ServiceCore) VisibleQuestCharacters(ctx context.Context, rows []db.QuestCharacter, moduleType db.ModuleType, id int32) []db.QuestCharacter {
	permissions := &ModulePermission{NeedsSuperAdmin: true}
	_, _, managerErr := core.CheckModuleTypePermissions(ctx, moduleType, id, permissions)
	_, authErr := core.AuthorizeUserCookie(ctx)
	visible := make([]db.QuestCharacter, 0, len(rows))
	for _, row := range rows {
		canManage := managerErr == nil
		if !canManage && authErr == nil {
			otherType, otherID := db.ModuleTypeCharacter, row.CharacterID
			if moduleType == db.ModuleTypeCharacter {
				otherType, otherID = db.ModuleTypeQuest, row.QuestID
			}
			_, _, err := core.CheckModuleTypePermissions(ctx, otherType, otherID, permissions)
			canManage = err == nil
		}
		if !canManage {
			if row.Approved != 1 {
				continue
			}
			row.MotivationalLetter = ""
		}
		visible = append(visible, row)
	}
	return visible
}

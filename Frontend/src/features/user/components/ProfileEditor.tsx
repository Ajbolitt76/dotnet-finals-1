import React, { useCallback, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { destroy, getParent, Instance, SnapshotIn, types } from "mobx-state-tree";
import { OtherUserProfileDto } from "@/features/user/types";
import {
  Button, CellButton,
  CustomSelect,
  CustomSelectOption,
  FormItem,
  FormLayout,
  FormLayoutGroup, IconButton,
  Input, Slider,
  Textarea
} from "@vkontakte/vkui";
import { StatusSelector } from "@/features/misc/components/StatusSelector";
import toPairs from "lodash/toPairs";
import { KnownUserContacts } from "@/lib/ApiTypes";
import { Icon28AddOutline } from "@vkontakte/icons";
import { nanoid } from "nanoid";
import { SkillSelector } from "@/features/skills/components/SkillSelector";
import { useUpdateProfile } from "@/features/user/api/updateUserProfile";

const userSkillModel = types.model("UserSkill", {
  id: types.optional(types.identifier, () => nanoid()),
  value: types.number,
  skillId: types.number,
  textValue: types.string,
  textInCircle: types.string,
}).actions((self) => ({
  setValue(value: number) {
    self.value = value;
  },
  setSkillId(skillId: number) {
    self.skillId = skillId;
  },
  setTextValue(textValue: string) {
    self.textValue = textValue;
  },
  setTextInCircle(textInCircle: string) {
    self.textInCircle = textInCircle;
  },
  delete() {
    getParent<Instance<typeof profileEditorFormWithValidation>>(self, 2).removeSkill(self);
  }
}));

const userContactModel = types.model("UserContact", {
  id: types.optional(types.identifier, () => nanoid()),
  name: types.string,
  value: types.string,
}).actions((self) => ({
  setName(name: string) {
    self.name = name;
  },
  setValue(value: string) {
    self.value = value;
  },
  delete() {
    getParent<Instance<typeof profileEditorFormWithValidation>>(self, 2).removeContact(self);
  }
}));

const profileEditorFormWithValidation = types.model("ProfileEditorForm", {
  photoUrl: types.string,
  aboutMe: types.string,
  statusId: types.number,
  skills: types.array(userSkillModel),
  contacts: types.array(userContactModel),
}).actions((self) => ({
    setPhotoUrl(photoUrl: string) {
      self.photoUrl = photoUrl;
    },
    setAboutMe(aboutMe: string) {
      self.aboutMe = aboutMe;
    },
    setStatusId(statusId: number) {
      self.statusId = statusId;
    },
    addSkill(skill?: SnapshotIn<typeof userSkillModel>) {
      self.skills.push(skill ?? { value: 0, skillId: 0, textValue: "", textInCircle: "" });
    },
    removeSkill(skill: SnapshotIn<typeof userSkillModel>) {
      destroy(skill);
    },
    addContact(contact?: SnapshotIn<typeof userContactModel>) {
      self.contacts.push(contact ?? { name: "", value: "" });
    },
    removeContact(contact: SnapshotIn<typeof userContactModel>) {
      destroy(contact);
    },
  }),
);


interface ProfileEditorProps {
  initialUser: OtherUserProfileDto;
}

export const SkillEditor: React.FC<{
  skill: Instance<typeof userSkillModel>;
}> = observer(({ skill }) => {
  return (
    <FormLayoutGroup mode="vertical">
      <FormLayoutGroup mode="horizontal" onRemove={() => skill.delete()} removable>
        <FormItem top="??????????">
          <SkillSelector value={skill.skillId} onChange={(e) => skill.setSkillId(e)}/>
        </FormItem>
        <FormItem top="??????????">
          <Input type="text" value={skill.textValue} onChange={(e) => skill.setTextValue(e.target.value)}/>
        </FormItem>
      </FormLayoutGroup>
      <FormLayoutGroup mode="horizontal">
        <FormItem top="?????????? ?? ????????????">
          <Input type="text" value={skill.textInCircle} onChange={(e) => skill.setTextInCircle(e.target.value)}/>
        </FormItem>
        <FormItem top="?????????????? ????????????????">
          <Slider step={1} value={skill.value} onChange={(e) => skill.setValue(e)}/>
        </FormItem>
      </FormLayoutGroup>
    </FormLayoutGroup>
  )
})

const contactOptions = toPairs(KnownUserContacts).map(([key, value]) => ({
  value: key,
  label: value,
}));

const ContactEditor: React.FC<{
  contact: Instance<typeof userContactModel>;
}> = observer(({ contact }) => (
    <FormLayoutGroup mode="horizontal" removable onRemove={() => contact.delete()}>
      <FormItem top="????????????????">
        <CustomSelect options={contactOptions} value={contact.name}
                      onChange={(e) => contact.setName(e.target.value)}/>
      </FormItem>
      <FormItem top="??????????">
        <Input type="text" value={contact.value} onChange={(e) => contact.setValue(e.target.value)}/>
      </FormItem>
    </FormLayoutGroup>
  )
);

const EditorSubheader: React.FC<{ title: string }> = ({ title }) => (
  <h3 className="text-xl font-bold ml-4">{title}</h3>
)

const EditorNotice: React.FC<{ text: string }> = ({ text }) => (
  <p className="text-l text-gray-300 ml-4">{text}</p>
)

export const ProfileEditor: React.FC<ProfileEditorProps> = observer(({ initialUser }) => {
  const formStore = useMemo(() => profileEditorFormWithValidation.create({
    aboutMe: initialUser.about ?? "",
    photoUrl: initialUser.photo?.path ?? "",
    statusId: initialUser.status.id,
    skills: initialUser.skills?.map((skill) => ({
      value: skill.value,
      skillId: skill.skill.id,
      textValue: skill.textValue,
      textInCircle: skill.textInCircle,
    })) ?? [],
    contacts: initialUser.contacts?.map((contact) => ({
      value: contact.value,
      name: contact.name,
    })) ?? [],
  }), [])

  const { mutate, isLoading } = useUpdateProfile();
  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      stateId: formStore.statusId,
      aboutMe: formStore.aboutMe,
      photoUrl: formStore.photoUrl,
      skills: formStore.skills.map((skill) => ({
        value: skill.value,
        skill: { id: skill.skillId },
        textValue: skill.textValue,
        textInCircle: skill.textInCircle,
      })),
      contacts: formStore.contacts.map((contact) => ({
        value: contact.value,
        name: contact.name,
      })),
    });
  }


  return (
    <div className="elevated-8 rounded-2xl py-4 px-2">
      <h2 className="text-3xl font-bold ml-4">???????????????????????????? ??????????????</h2>
      <FormLayout onSubmit={(e) => onSave(e)}>
        <div className="flex flex-col gap-4">
          <FormLayoutGroup>
            <FormItem top="?????? ????????????">
              <StatusSelector type="user" value={formStore.statusId} onChange={formStore.setStatusId}/>
            </FormItem>
            <FormItem top="???????????? ???? ????????????">
              <Input type="text" value={formStore.photoUrl} onChange={(e) => formStore.setPhotoUrl(e.target.value)}/>
            </FormItem>
            <FormItem top="?? ????????">
              <Textarea value={formStore.aboutMe} onChange={(e) => formStore.setAboutMe(e.target.value)}/>
            </FormItem>
          </FormLayoutGroup>
          <div>
            <EditorSubheader title="????????????????"/>
            {formStore.contacts.map((contact) => (<ContactEditor key={contact.id} contact={contact}/>))}
            <CellButton before={<Icon28AddOutline/>} onClick={() => formStore.addContact()}>
              ???????????????? ??????????????
            </CellButton>
          </div>
          <div>
            <EditorSubheader title="????????????"/>
            {formStore.skills.map((skill) => (<SkillEditor key={skill.id} skill={skill}/>))}
            <CellButton before={<Icon28AddOutline/>} onClick={() => formStore.addSkill()}>
              ???????????????? ??????????
            </CellButton>
          </div>
          <Button loading={isLoading} appearance="positive" size="l" className="self-center"
                  type="submit">??????????????????</Button>
        </div>
      </FormLayout>
    </div>
  )
})

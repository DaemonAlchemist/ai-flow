import { SendOutlined } from "@ant-design/icons";
import { Button, Spin, Switch, Tabs } from "antd";
import { useStory } from "../../../lib/storyGen/useStory";
import { usePrompt } from "../../../lib/usePrompt";
import { Editable } from "../../Editable";
import { systemPrompts, userPrompts } from "../Storygen.helpers";
import { ICharacter } from "../story.d";
import { CharactersProps } from "./Characters";
import styles from "./Characters.module.scss";

export const CharactersComponent = ({}:CharactersProps) => {
    const {story, update} = useStory();

    const updateMainCharacter = (char:ICharacter) => {
        update.character.add(char)();
    }

    const updateCharacters = (response:{characters:ICharacter[]}) => {
        response.characters.forEach(char => {update.character.add(char)()});
    }

    const mcPrompt = usePrompt(systemPrompts.mainCharacter, updateMainCharacter);
    const spPrompt = usePrompt(systemPrompts.supportingCharacters, updateCharacters);

    return <Spin spinning={mcPrompt.isRunning || spPrompt.isRunning}>
        <h2>Characters</h2>
        <Button onClick={mcPrompt.run(userPrompts.mainCharacter(story))} type="primary">
            <SendOutlined /> Generate main character
        </Button>
        <Button onClick={spPrompt.run(userPrompts.supportingCharacters(story))} type="primary">
            <SendOutlined /> Generate supporting characters
        </Button>
        <hr />
        <ul className={styles.characters}>
            {story.characters.map((char, i) => <li key={i}>
                <h2 className={styles.name}>
                    <Editable value={char.name} onChange={update.character.name(i)} placeholder="Character name here" />
                    <Switch checkedChildren="Main" unCheckedChildren="Supporting" checked={char.role === "main"} onChange={update.character.role(i)}/>
                </h2>
                <div className={styles.info}>
                    <Tabs tabPosition="left">
                        <Tabs.TabPane key="description" tabKey="description" tab="Description">
                            <Editable value={char.physicalDescription} onChange={update.character.description(i)} placeholder="Physical description goes here." textArea/>
                        </Tabs.TabPane>
                        <Tabs.TabPane key="personality" tabKey="personality" tab="Personality">
                            <Editable value={char.personality} onChange={update.character.personality(i)} placeholder="Personality goes here." textArea/>
                        </Tabs.TabPane>
                        <Tabs.TabPane key="backstory" tabKey="backstory" tab="Backstory">
                            <Editable value={char.backstory} onChange={update.character.backstory(i)} placeholder="Backstory goes here." textArea/>
                        </Tabs.TabPane>
                        <Tabs.TabPane key="arc" tabKey="arc" tab="Story Arc">
                            <Editable value={char.storyArc} onChange={update.character.arc(i)} placeholder="Story arc goes here." textArea/>
                        </Tabs.TabPane>
                        <Tabs.TabPane key="goals" tabKey="goals" tab="Goals">
                            <Editable value={char.goals} onChange={update.character.goals(i)} placeholder="Goal goes here." textArea/>
                        </Tabs.TabPane>
                        <Tabs.TabPane key="motivations" tabKey="motivations" tab="Motivations">
                            <Editable value={char.motivations} onChange={update.character.motivations(i)} placeholder="Motivations goes here." textArea/>
                        </Tabs.TabPane>
                    </Tabs>
                </div>
                <div className={styles.id}>
                    <Editable value={char.id} onChange={update.character.id(i)} placeholder="idGoesHere" />
                </div>
            </li>)}
        </ul>
    </Spin>
}

import { ArrowUpOutlined } from "@ant-design/icons";
import { Button, Col, Collapse, Popconfirm, Row, Tag } from "antd";
import { useStory } from "../../../lib/storyGen/useStory";
import { DeleteBtn } from "../../DeleteBtn";
import { IsFinished } from "../../IsFinished";
import { PartsDone } from "../../PartsDone";
import { PromptButton } from "../../PromptButton";
import { SummarizeBtn } from "../../SummarizeBtn";
import { Beats } from "../Beats";
import { getCharacter, getLocation, systemPrompts, userPrompts } from "../Storygen.helpers";
import { Summarizable } from "../Summarizable";
import { ICharacter, IScene } from "../story";
import { ScenesProps } from "./Scenes";
import styles from "./Scenes.module.scss";

export const ScenesComponent = ({actIndex, chapterIndex}:ScenesProps) => {
    const {story, update} = useStory();

    const updateScenes = (response:{scenes: IScene[], newCharacters: ICharacter[]}) => {
        response.scenes.forEach(scene => {update.scene.add(actIndex, chapterIndex, {
            ...scene,
            beats: [],
        })()});

        (response.newCharacters || []).forEach(char => {update.character.add(char)()});
    }

    const scenes = story.plot.acts[actIndex].chapters[chapterIndex].scenes || []; 

    return <div className={styles.scenes}>
        <Row>
            <Col xs={4}><h2>Scenes</h2></Col>
            <Col xs={20}>
                <PromptButton
                    promptId="scenes"
                    onUpdate={updateScenes}
                    finishMsg="has finished creating scenes for your chapter"
                    entityTypes="scenes"
                    promptParams={{actIndex, chapterIndex}}
                />
            </Col>
        </Row>
        <hr />
        <Collapse>
            {scenes.map((scene, i) => <Collapse.Panel
                className={styles.scene}
                header={<>
                    Scene {i+1}: {scene.title}
                    &nbsp;&nbsp;
                    <PartsDone entities={scene.beats || []} filter={b => !!b.text} />
                    <IsFinished value={scene.summary} />
                    <DeleteBtn onClick={update.scene.remove(actIndex, chapterIndex, i)} entityType="scene"/>
                </>}
                key={i}
            >
                <div className={styles.sceneInfo}>
                    <Tag>{getLocation(story, scene.locationId)}</Tag>
                    {scene.characterIds.map(id => <Tag color="green">{getCharacter(story, id)}</Tag>)}
                    &nbsp;&nbsp;
                    <Popconfirm title="Are you sure you want to convert this scene into a chapter?" onConfirm={update.scene.toChapter(actIndex, chapterIndex, i)}>
                        <Button className={styles.hoistBtn} type="default" size="small"><ArrowUpOutlined /> Convert to chapter</Button>
                    </Popconfirm>
                </div>
                <Row>
                    <Col xs={8}>
                        <Summarizable entity={scene} updateOutline={update.scene.outline(actIndex, chapterIndex, i)} updateSummary={update.scene.summary(actIndex, chapterIndex, i)}/>
                    </Col>
                    <Col xs={16}>
                        <Beats actIndex={actIndex} chapterIndex={chapterIndex} sceneIndex={i} />
                    </Col>
                </Row>                    
            </Collapse.Panel>)}
        </Collapse>
        <SummarizeBtn
            entities={scenes}
            field="summary"
            entityName="chapter"
            promptId="chapter.summary"
            onUpdate={update.chapter.summary(actIndex, chapterIndex)}
        />
    </div>;
}

import { SendOutlined } from "@ant-design/icons";
import { Button, Col, Collapse, Row, Spin } from "antd";
import { useStory } from "../../../lib/storyGen/useStory";
import { usePrompt } from "../../../lib/usePrompt";
import { DeleteBtn } from "../../DeleteBtn";
import { IsFinished } from "../../IsFinished";
import { PartsDone } from "../../PartsDone";
import { Beats } from "../Beats";
import { systemPrompts, userPrompts } from "../Storygen.helpers";
import { Summarizable } from "../Summarizable";
import { IScene } from "../story";
import { ScenesProps } from "./Scenes";
import styles from "./Scenes.module.scss";

export const ScenesComponent = ({actIndex, chapterIndex}:ScenesProps) => {
    const {story, update} = useStory();

    const updateScenes = (response:{scenes: IScene[]}) => {
        response.scenes.forEach(scene => {update.scene.add(actIndex, chapterIndex, {
            ...scene,
            beats: [],
        })()});
    }

    const prompt = usePrompt(systemPrompts.scenes(story.length), updateScenes);

    return <Spin spinning={prompt.isRunning}>
        <div className={styles.scenes}>
            <h2>
                Scenes
                <Button type="primary" onClick={prompt.run(userPrompts.scenes(story, actIndex, chapterIndex))}><SendOutlined /> Create scenes</Button>
            </h2>
            <hr />
            <Collapse>
                {(story.plot.acts[actIndex].chapters[chapterIndex].scenes || []).map((scene, i) => <Collapse.Panel
                    className={styles.scene}
                    header={<>
                        Scene {i+1}: {scene.title}
                        &nbsp;&nbsp;
                        <PartsDone entities={scene.beats || []} filter={b => !!b.text} />
                        <IsFinished value={scene.summary} />
                        <DeleteBtn onClick={update.scene.remove(actIndex, chapterIndex, i)} />
                    </>}
                    key={i}
                >
                    <Row>
                        <Col xs={6}>
                            <Summarizable entity={scene} updateOutline={update.scene.outline(actIndex, chapterIndex, i)} updateSummary={update.scene.summary(actIndex, chapterIndex, i)}/>
                        </Col>
                        <Col xs={18}>
                            <Beats actIndex={actIndex} chapterIndex={chapterIndex} sceneIndex={i} />
                        </Col>
                    </Row>                    
                </Collapse.Panel>)}
            </Collapse>
        </div>
    </Spin>;
}

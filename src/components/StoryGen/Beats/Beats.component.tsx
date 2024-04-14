import { Col, Collapse, Row, Spin } from "antd";
import { useStory } from "../../../lib/storyGen/useStory";
import { usePrompt } from "../../../lib/usePrompt";
import { DeleteBtn } from "../../DeleteBtn";
import { IsFinished } from "../../IsFinished";
import { PromptButton } from "../../PromptButton";
import { SummarizeBtn } from "../../SummarizeBtn";
import { systemPrompts, userPrompts } from "../Storygen.helpers";
import { Summarizable } from "../Summarizable";
import { Text } from "../Text";
import { IBeat } from "../story";
import { BeatsProps } from "./Beats";
import styles from './Beats.module.scss';

export const BeatsComponent = ({actIndex, chapterIndex, sceneIndex}:BeatsProps) => {
    const {story, update} = useStory();

    const updateBeats = (response:{beats: IBeat[]}) => {
        response.beats.forEach(beat => {update.beat.add(actIndex, chapterIndex, sceneIndex, beat)()});
    }

    const prompt = usePrompt(systemPrompts.beats(story.length), updateBeats);

    const beats = story.plot.acts[actIndex].chapters[chapterIndex].scenes[sceneIndex].beats || [];

    return <Spin spinning={prompt.isRunning}>
        <div className={styles.beats}>
            <Row>
                <Col xs={4}><h2>Beats</h2></Col>
                <Col xs={20}>
                    <PromptButton
                        systemPrompt={systemPrompts.beats(story.length)}
                        onUpdate={updateBeats}
                        entityTypes="beats"
                        userPrompt={userPrompts.beats(story, actIndex, chapterIndex, sceneIndex)}
                    />
                </Col>
            </Row>
            <hr />
            <Collapse>
                {beats.map((beat, i) => <Collapse.Panel
                    className={styles.beat}
                    header={<>
                        Beat {i+1}: {beat.title}
                        &nbsp;&nbsp;
                        <IsFinished value={beat.text} />
                        <DeleteBtn onClick={update.beat.remove(actIndex, chapterIndex, sceneIndex, i)} entityType="beat"/>
                    </>}
                    key={i}
                >
                    <Row>
                        <Col xs={6}>
                            <Summarizable
                                entity={beat}
                                updateOutline={update.beat.outline(actIndex, chapterIndex, sceneIndex, i)}
                                updateSummary={update.beat.summary(actIndex, chapterIndex, sceneIndex, i)}
                                hideSummary
                            />
                        </Col>
                        <Col xs={18}>
                            <Text actIndex={actIndex} chapterIndex={chapterIndex} sceneIndex={sceneIndex} beatIndex={i} />
                        </Col>
                    </Row>                    
                </Collapse.Panel>)}
            </Collapse>
            <SummarizeBtn
                entities={beats}
                field="text"
                entityName="scene"
                systemPrompt={systemPrompts.sceneSummary(story.length)}
                userPrompt={userPrompts.summary.scene(story, actIndex, chapterIndex, sceneIndex)}
                onUpdate={update.scene.summary(actIndex, chapterIndex, sceneIndex)}
            />
        </div>
    </Spin>;
}

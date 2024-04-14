import { Col, Collapse, Row } from "antd";
import { useStory } from "../../../lib/storyGen/useStory";
import { DeleteBtn } from "../../DeleteBtn";
import { IsFinished } from "../../IsFinished";
import { PartsDone } from "../../PartsDone";
import { PromptButton } from "../../PromptButton";
import { Chapters } from "../Chapters";
import { systemPrompts, userPrompts } from "../Storygen.helpers";
import { Summarizable } from "../Summarizable";
import { IAct } from "../story";
import { ActsProps } from "./Acts";
import styles from './Acts.module.scss';

export const ActsComponent = ({}:ActsProps) => {
    const {story, update} = useStory();

    const updateActs = (response:{acts: IAct[]}) => {
        update.act.set(response.acts);
    }

    return <div className={styles.acts}>
        <Row>
            <Col xs={4}><h2>Acts</h2></Col>
            <Col xs={20}>
                <PromptButton
                    systemPrompt={systemPrompts.acts(story.length)}
                    onUpdate={updateActs}
                    entityTypes="acts"
                    userPrompt={userPrompts.acts(story)}
                />
            </Col>
        </Row>
        <hr />
        <Collapse>
            {story.plot.acts.map((act, i) => <Collapse.Panel
                className={styles.act}
                header={<>
                    Act {i+1}: {act.title}
                    &nbsp;&nbsp;
                    <PartsDone entities={act.chapters || []} filter={c => !!c.summary} />
                    <IsFinished value={act.summary} />
                    <DeleteBtn onClick={update.act.remove(i)} entityType="act"/>
                </>}
                key={i}
            >
                <Row>
                    <Col xs={4}>
                        <Summarizable entity={act} updateOutline={update.act.outline(i)} updateSummary={update.act.summary(i)}/>
                    </Col>
                    <Col xs={20}>
                        <Chapters actIndex={i} />
                    </Col>
                </Row>                    
            </Collapse.Panel>)}
        </Collapse>
    </div>;
}

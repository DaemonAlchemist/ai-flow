import { BankOutlined, BookOutlined, FolderOpenOutlined, InfoCircleOutlined, QuestionCircleOutlined, ReadOutlined, SaveOutlined, TeamOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Tabs } from "antd";
import { loadStory, saveStory } from "../../lib/save";
import { useStory } from "../../lib/storyGen/useStory";
import { Overview } from "../Overview";
import { Acts } from "./Acts";
import { Characters } from "./Characters";
import { Locations } from "./Locations";
import { Outline } from "./Outline";
import { Read } from "./Read";
import { StoryGenProps } from "./StoryGen.d";
import styles from "./StoryGen.module.scss";

export const StoryGenComponent = ({}:StoryGenProps) => {
    const {story} = useStory();

    const save = () => {
        saveStory(story.title);
    }

    return <div>
        <div className={styles.controls}>
            <Button type="link" onClick={save}><SaveOutlined /> Save story</Button>
            <Popconfirm title={`This will overwrite ${story.title}.  Are you sure you want to continue?`} onConfirm={loadStory}>
                <Button type="link"><FolderOpenOutlined /> Load story</Button>
            </Popconfirm>
        </div>
        <hr/>
        <Tabs tabPosition="left">
            <Tabs.TabPane key="overview" tabKey="overview" tab={<><QuestionCircleOutlined /> What is this?</>}>
                <Overview />
            </Tabs.TabPane>
            <Tabs.TabPane key="outline" tabKey="outline" tab={<><InfoCircleOutlined /> Story Overview</>}>
                <Outline />
            </Tabs.TabPane>
            <Tabs.TabPane key="locations" tabKey="locations" tab={<><BankOutlined /> Locations</>}>
                <Locations />
            </Tabs.TabPane>
            <Tabs.TabPane key="characters" tabKey="characters" tab={<><TeamOutlined /> Characters</>}>
                <Characters />
            </Tabs.TabPane>
            <Tabs.TabPane key="acts" tabKey="acts" tab={<><BookOutlined /> Write</>}>
                <Acts />
            </Tabs.TabPane>
            <Tabs.TabPane key="read" tabKey="read" tab={<><ReadOutlined /> Read</>}>
                <Read />
            </Tabs.TabPane>
        </Tabs>
    </div>;
}
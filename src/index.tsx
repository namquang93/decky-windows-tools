import {
  //ButtonItem,
  PanelSection,
  PanelSectionRow,
  SliderField,
  //Navigation,
  staticClasses
} from "@decky/ui";
import {
  addEventListener,
  removeEventListener,
  callable,
  definePlugin,
  toaster,
  // call,
  // routerHook
} from "@decky/api"
import { Settings } from "./util";
import { useState } from "react";
import { FaShip } from "react-icons/fa";

// import logo from "../assets/logo.png";
// const get_volume = callable<[], number>('get_volume');
// const set_volume = callable<[number], void>('set_volume');
let baseVolumn = await callable<[], number>('get_volume')();
let baseBrightness = await callable<[], number>('get_brightness')();
let baseOSD = await callable<[], number>('get_osd')();
let baseOSDSize = await callable<[], number>('get_osd_size')();

function Content() {
  Settings.setVolume(baseVolumn);
  Settings.setBrightness(baseBrightness);
  Settings.setOSD(baseOSD);
  Settings.setOSDSize(baseOSDSize);
  const [volume, setVolume] = useState<number>(
    Settings.getVolume()
  );
  const [brightness, setBrightness] = useState<number>(
    Settings.getBrightness()
  );
  const [osd, setOSD] = useState<number>(
    Settings.getOSD()
  );
  const [osdSize, setOSDSize] = useState<number>(
    Settings.getOSDSize()
  );

  return [
    <PanelSection title="System">
      <PanelSectionRow>
        <SliderField
          label={"Volume"}
          showValue={true}
          min={0}
          max={100}
          value={volume}
          step={1}
          onChange={(value: number) => {
            console.log("Volume changed to:", value);
            setVolume(value);
            baseVolumn = value;
            Settings.setVolume(value);
          }}>
        </SliderField>
      </PanelSectionRow>
      <PanelSectionRow>
        <SliderField
          label="Brightness"
          showValue={true}
          min={0}
          max={100}
          value={brightness}
          step={10}
          onChange={(value: number) => {
            console.log("Brightness changed to:", value);
            setBrightness(value);
            baseBrightness = value;
            Settings.setBrightness(value);
          }}>
        </SliderField>
      </PanelSectionRow>
    </PanelSection>,
    <PanelSection title="OSD">
      <PanelSectionRow>
        <SliderField
          label={"Overlay"}
          showValue={true}
          min={0}
          max={4}
          notchCount={5}
          notchLabels={[
            { notchIndex: 0, label: "Off" },
            { notchIndex: 1, label: "FPS" },
            { notchIndex: 2, label: "Battery" },
            { notchIndex: 3, label: "Detailed" },
            { notchIndex: 4, label: "Full" }
          ]}
          value={osd}
          step={1}
          onChange={(value: number) => {
            console.log("OSD changed to:", value);
            setOSD(value);
            baseOSD = value;
            Settings.setOSD(value);
          }}>
        </SliderField>
        <SliderField
          label={"Overlay Size"}
          showValue={true}
          min={1}
          max={6}
          value={osdSize}
          step={1}
          onChange={(value: number) => {
            console.log("OSD size changed to:", value);
            setOSDSize(value);
            baseOSDSize = value;
            Settings.setOSDSize(value);
          }}>
        </SliderField>
      </PanelSectionRow>
    </PanelSection>
  ];
};

export default definePlugin(() => {
  console.log("Template plugin initializing, this is called once on frontend startup")

  // serverApi.routerHook.addRoute("/decky-plugin-test", DeckyPluginRouterTest, {
  //   exact: true,
  // });

  // Add an event listener to the "timer_event" event from the backend
  const listener = addEventListener<[
    test1: string,
    test2: boolean,
    test3: number
  ]>("timer_event", (test1, test2, test3) => {
    console.log("Template got timer_event with:", test1, test2, test3)
    toaster.toast({
      title: "template got timer_event",
      body: `${test1}, ${test2}, ${test3}`
    });
  });

  return {
    // The name shown in various decky menus
    name: "Decky Windows Tools",
    // The element displayed at the top of your plugin's menu
    titleView: <div className={staticClasses.Title}>Decky Windows Tools</div>,
    // The content of your plugin's menu
    content: <Content />,
    // The icon displayed in the plugin list
    icon: <FaShip />,
    // The function triggered when your plugin unloads
    onDismount() {
      console.log("Unloading")
      removeEventListener("timer_event", listener);
      // serverApi.routerHook.removeRoute("/decky-plugin-test");
    },
  };
});

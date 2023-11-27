import { JSONEditor } from "vanilla-jsoneditor";
import { useEffect, useRef } from "react";
import "./VanillaJSONEditor.css";

import { useMantineColorScheme } from '@mantine/core';


export default function SvelteJSONEditor(props) {
  const refContainer = useRef(null);
  const refEditor = useRef(null);
  const { colorScheme } = useMantineColorScheme();

  let className = "vanilla-jsoneditor-react";
  if (colorScheme === 'dark') {
    className += " jse-theme-dark";
  }

  useEffect(() => {
    // create editor
    refEditor.current = new JSONEditor({
      target: refContainer.current,
      props: {}
    });

    return () => {
      // destroy editor
      if (refEditor.current) {
        console.log("destroy editor");
        refEditor.current.destroy();
        refEditor.current = null;
      }
    };
  }, []);

  // update props
  useEffect(() => {
    if (refEditor.current) {
      refEditor.current.updateProps(props);
    }
  }, [props]);

  return <div className={className} ref={refContainer}></div>;
}

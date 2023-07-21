import { useMemo } from "react";

import { Box } from "@/components";
import RenderHTML from "./RenderHTML";
import RenderEmbeded from "./RenderEmbeded";

interface Props {
  data: any;
}

export default function RenderContent({ data }: Props) {
  const render = useMemo(() => {
    return data.map((el: any, idx: number) => {
      const { value, block_type } = el;

      if (block_type === "content") {
        return <RenderHTML key={idx} data={value} />;
      } else if (block_type === "embed") {
        return (
          <RenderEmbeded
            key={idx}
            src={value.src}
            width={value.width}
            height={value.height}
          />
        );
      }
    });
  }, [data]);

  return <Box>{render}</Box>;
}

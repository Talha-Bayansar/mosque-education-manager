"use client";

import type { Meetup } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import FilerobotImageEditor, {
  TABS,
  TOOLS,
} from "react-filerobot-image-editor";

type Props = {
  meetup: Meetup;
};

export const CreatePoster = ({ meetup }: Props) => {
  const searchParams = useSearchParams();
  const image = searchParams.get("image");

  return (
    <div className="h-full w-full">
      <FilerobotImageEditor
        source={image!}
        onSave={(editedImageObject, designState) =>
          console.log("saved", editedImageObject, designState)
        }
        annotationsCommon={{
          fill: "#000000",
        }}
        Text={{ text: meetup.subject }}
        tabsIds={[TABS.ANNOTATE]}
        defaultTabId={TABS.ANNOTATE}
        defaultToolId={TOOLS.TEXT}
        translations={undefined}
        useBackendTranslations={false}
        savingPixelRatio={0}
        previewPixelRatio={0}
      />
    </div>
  );
};

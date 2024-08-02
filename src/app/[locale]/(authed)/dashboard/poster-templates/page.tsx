import { PosterTemplateCard } from "@/features/poster/components/poster-template-card";
import { UploadPosterTemplate } from "@/features/poster/components/upload-poster-template";
import { getPosterTemplates } from "@/features/poster/server-actions/poster";
import { View } from "@/shared/components/layout/view";

const PosterTemplatesPage = async () => {
  const posterTemplates = await getPosterTemplates();

  return (
    <View className="w-full">
      <UploadPosterTemplate />
      <View className="md:grid md:grid-cols-4 w-full">
        {posterTemplates.map((template, i) => (
          <PosterTemplateCard
            key={`${template.utName}_${i}`}
            posterTemplate={template}
          />
        ))}
      </View>
    </View>
  );
};

export default PosterTemplatesPage;

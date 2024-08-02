import { PosterTemplateCardSkeleton } from "@/features/poster/components/poster-template-card";
import { UploadPosterTemplate } from "@/features/poster/components/upload-poster-template";
import { generateArray } from "@/lib/utils";
import { View } from "@/shared/components/layout/view";

const PosterTemplatesLoading = () => {
  return (
    <View className="w-full">
      <UploadPosterTemplate disabled />
      <View className="md:grid md:grid-cols-4">
        {generateArray(4).map((template) => (
          <PosterTemplateCardSkeleton key={template} />
        ))}
      </View>
    </View>
  );
};

export default PosterTemplatesLoading;

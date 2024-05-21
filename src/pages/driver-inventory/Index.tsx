import { AddWhiteIcon, DriverInventoryIcon } from '@/assets/icons';
import Button from '@/components/Button/Button';
import FallbackPageWrapper from '@/components/Fallback/FallbackPageWrapper';
import ProjectSelect from '@/components/ProjectSelect/Index';

export default function DriverInventory() {
  return (
    <FallbackPageWrapper>
      <div className="flex items-center justify-between">
        <div className="mb-8 flex items-center gap-x-2.5">
          <DriverInventoryIcon />
          <span className="text-lg font-semibold">Sürücü Envanteri</span>
        </div>
        <div className="flex items-center justify-center gap-x-4">
          <Button className="flex gap-x-2">
            <AddWhiteIcon className="w-4" /> Sürücü Ekle
          </Button>
          <ProjectSelect rootClassName="w-60" selectClassName="h-11" />
        </div>
      </div>
    </FallbackPageWrapper>
  );
}

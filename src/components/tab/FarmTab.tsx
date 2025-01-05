import AnimalManagement from './AnimalManagement';
import PlantingTools from './PlantingTools';
import EquipmentTool from './EquipmentTool';

export function FarmTab() {
  return (
    <div>
      <AnimalManagement />
      <div className="h-px my-4"></div>
      <PlantingTools />
      <div className="h-px my-4"></div>
      <EquipmentTool />
    </div>
  );
}

export default FarmTab;

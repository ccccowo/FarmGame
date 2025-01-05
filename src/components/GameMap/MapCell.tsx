import React from "react";
import { useGameState } from "../../context/GameContext";
import { PlantedCrop } from "../../types/plants";
import { PLANTS } from "../../utils/plants";
import { Sprout, Check, Cat,PiggyBank,PawPrint } from "lucide-react";
import { GrazingAnimal } from "../../types/animals";
import { ANIMALS } from "../../utils/animals";

interface MapCellProps {
  index: number;
  plantedCrop?: PlantedCrop | null;
  grazingAnimal?: GrazingAnimal | null;
}

export const MapCell: React.FC<MapCellProps> = ({
  index,
  plantedCrop,
  grazingAnimal,
}) => {
  const { state, dispatch } = useGameState();
  // 当没有种下作物时，并且有种植选择时，可以种植
  const canPlant =
    !plantedCrop &&
    state.selectedPlant &&
    state.warehouse.seeds[state.selectedPlant] > 0;
  // 当没有放牧动物时，并且有动物选择时，可以养殖
  const canAnimal =
    !grazingAnimal &&
    state.selectedAnimal &&
    state.warehouse.ownedAnimals[state.selectedAnimal] > 0;

  const handleCellClick = () => {
    // 当种下作物时，并且成熟时，可以收获
    if (plantedCrop) {
      if (plantedCrop.isReady) {
        dispatch({ type: "HARVEST_PLANT", id: plantedCrop.id });
      }
      return;
    }

    // 当没有种下作物时，并且有种植选择时，可以种植
    if (canPlant) {
      dispatch({ type: "PLANT_PLANT", position: index });
    }

    // 当正在放牧动物时，并且动物产物成熟时，可以收获
    if (grazingAnimal) {
      if (grazingAnimal.product && grazingAnimal.product.isMature) {
        dispatch({ type: "COLLECT_ANIMAL_PRODUCTS", id: grazingAnimal.id });
      }
      return;
    }

    // 当没有放牧动物时，并且有动物选择时，可以养殖
    if (canAnimal) {
      dispatch({ type: "GRAZE_ANIMAL", position: index });
    }
  };

  // 获取作物的生长进度
  const getProgressPercentage = () => {
    if (!plantedCrop) return 0;
    const now = Date.now();
    const total = plantedCrop.growthTime;
    const current = now - plantedCrop.plantedAt;
    return Math.min((current / total) * 100, 100);
  };

  // 获取动物的成熟进度
  const getAnimalProgressPercentage = () => {
    if (!grazingAnimal) return 0;
    const now = Date.now();
    const total = grazingAnimal.maturityTime;
    const current = now - grazingAnimal.grazedAt;
    return Math.min((current / total) * 100, 100);
  };

  // 获取动物产物的生成进度
  const getAnimalProductProgressPercentage = () => {
    if (!grazingAnimal || !grazingAnimal.product) return 0;
    const now = Date.now();
    const total = grazingAnimal.product.maturityTime;
    const current = now - grazingAnimal.product.producedAt;
    return Math.min((current / total) * 100, 100);
  };

  const getTooltipContent = () => {
    const now = Date.now();
    // 空地
    if (!plantedCrop && !grazingAnimal) {
      if (canPlant && state.selectedPlant) {
        return `点击种植 ${PLANTS[state.selectedPlant].name}`;
      } else if (canAnimal && state.selectedAnimal) {
        return `点击放牧 ${ANIMALS[state.selectedAnimal].name}`;
      }
      return "空地";
    }

    // 种下作物时
    if (plantedCrop) {
      const plant = PLANTS[plantedCrop.type];
      // 作物成熟
      if (plantedCrop.isReady) {
        return `${plant.name} (已成熟，点击收获)`;
      }
      // 作物未成熟
      // 计算成熟还需要多少时间（总时间-（now - 种下时间））
      const timeRemaining = Math.max(
        0,
        Math.ceil(
          (plantedCrop.growthTime - (now - plantedCrop.plantedAt)) / 1000
        )
      );
      return `${plant.name} (还需 ${timeRemaining} 秒)`;
    }

    // 放牧动物时
    if (grazingAnimal) {
      const animal = ANIMALS[grazingAnimal.type];
      // 动物未成熟
      if (!grazingAnimal.isMature) {
        return `${animal.name} (还需 ${Math.ceil(
          (grazingAnimal.maturityTime - (now - grazingAnimal.grazedAt)) / 1000
        )} 秒)成熟`;
      }
      // 动物成熟，动物产物未成熟
      else if (grazingAnimal.product && !grazingAnimal.product.isMature) {
        return `${animal.name} (动物产物还需 ${Math.ceil(
          (grazingAnimal.product.maturityTime -
            (now - grazingAnimal.product.producedAt)) /
            1000
        )} 秒)生成`;
      }
      // 动物成熟，动物产物成熟
      else if (grazingAnimal.product && grazingAnimal.product.isMature) {
        return `${animal.name} (动物产物已生成，点击收获)`;
      }
    }
  };
  const getCellStyle = () => {
    if (plantedCrop) {
      return "bg-green-100 hover:bg-green-200";
    } else if (canPlant) {
      return "bg-emerald-50 hover:bg-emerald-100 ring-2 ring-emerald-300";
    } else if (grazingAnimal) {
      // 返回黄色背景
      return "bg-amber-50 hover:bg-amber-100";
    } else if (canAnimal) {
      return "bg-amber-50 hover:bg-amber-100 ring-2 ring-amber-300";
    } 
    // 返回白色背景
    else return "bg-white hover:bg-gray-100";
  };

  return (
    <div className="relative">
      <div
        onClick={handleCellClick}
        className={`group relative w-full h-full aspect-square rounded-lg cursor-pointer transition-all duration-200 ${getCellStyle()}`}
      >
        {/* Tooltip */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-full whitespace-nowrap z-50 shadow-lg">
          {getTooltipContent()}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45" />
        </div>

        {/* Plant Content */}
        {plantedCrop && (
          <div className="relative w-full h-full flex items-center justify-center">
            {plantedCrop.isReady ? (
              // 勾勾图标
              <Check className="w-6 h-6 text-green-600" />
            ) : (
              // 新芽图标
              <Sprout className="w-6 h-6 text-green-600" />
            )}
            <div className="absolute bottom-1 left-1 right-1 h-1 bg-gray-200/80 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
          </div>
        )}

        {/* Animal Content */}
        {grazingAnimal && (
          <div className="relative w-full h-full flex items-center justify-center">
            {grazingAnimal.isMature ? (
              // 当动物产品准备收获时
              grazingAnimal.product?.isMature ? (
                <Check className="w-6 h-6 text-green-600" />
              ) : (
                // 当动物成熟但产品未准备好时
                grazingAnimal.type === 'pig' ? (
                  <PiggyBank className="w-6 h-6 text-amber-600" />
                ) : (
                  <PawPrint className="w-6 h-6 text-amber-600" />
                )
              )
            ) : (
              // 动物未成熟时
              grazingAnimal.type === 'pig' ? (
                <PiggyBank className="w-6 h-6 text-amber-600" />
              ) : (
                <PawPrint className="w-6 h-6 text-amber-600" />
              )
            )}
            {/* ... progress bar ... */}
            <div className="absolute bottom-1 left-1 right-1 h-1 bg-gray-200/80 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${getAnimalProgressPercentage()}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

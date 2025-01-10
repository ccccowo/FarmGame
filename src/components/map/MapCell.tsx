import React, { useState } from "react";
import { useGameState } from "../../context/GameContext";
import { PlantedCrop } from "../../types/plants";
import { PLANTS } from "../../utils/plants";
import { Sprout, Check, PiggyBank, PawPrint, X } from "lucide-react";
import { GrazingAnimal } from "../../types/animals";
import { ANIMALS } from "../../utils/animals";
import { message, Modal } from "antd";
import { EQUIPMENT } from "../../utils/equipment";
import { formatTimeRemaining } from "../../utils/timeUtils";

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
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
  // 当选择了道具并且道具不为0时，可以使用道具
  const canUse =
    state.selectedEquipment &&
    state.warehouse.equipments[state.selectedEquipment] > 0;

  const handleCellClick = () => {
    // 当可以使用道具时
    if (canUse) {
      if (plantedCrop) {
        // 对植物使用道具
        if (EQUIPMENT[state.selectedEquipment].target === "plant") {
          dispatch({
            type: "USE_EQUIPMENT_TO_PLANT",
            equipmentType: state.selectedEquipment,
            id: plantedCrop.id,
          });
        }
      } else if (grazingAnimal) {
        // 对动物使用道具
        if (EQUIPMENT[state.selectedEquipment].target === "animal") {
          dispatch({
            type: "USE_EQUIPMENT_TO_ANIMAL",
            equipmentType: state.selectedEquipment,
            id: grazingAnimal.id,
          });
        }
      }
      return;
    }
    // 当种下作物时，并且成熟时，可以收获
    if (plantedCrop && !canUse) {
      if (plantedCrop.isReady) {
        dispatch({ type: "HARVEST_PLANT", id: plantedCrop.id });
      }
      return;
    }

    // 当没有种下作物时，并且有种植选择时，可以种植
    if (canPlant && !canUse) {
      dispatch({ type: "PLANT_PLANT", position: index });
    }

    // 当正在放牧动物时，并且动物产物成熟时，可以收获
    if (grazingAnimal && !canUse) {
      if (grazingAnimal.product.isMature) {
        dispatch({ type: "COLLECT_ANIMAL_PRODUCTS", id: grazingAnimal.id });
      } else {
        message.info("动物产品还未成熟");
      }
      return;
    }

    // 当没有放牧动物时，并且有动物选择时，可以养殖
    if (canAnimal && !canUse) {
      dispatch({ type: "GRAZE_ANIMAL", position: index });
    }
  };

  const handleRemovePlant = async (plantId: string) => {
    setIsLoading(true);
    try {
      const plant = state.plantedCrops.find((crop) => crop.id === plantId);
      if (!plant) return;

      const removeCost = Math.ceil(
        PLANTS[plant.type].purchasePrice * 0.1
      );
      if (state.money < removeCost) {
        message.error("金币不足，无法铲除");
        return;
      }

      await Modal.confirm({
        title: "确认铲除",
        content: (
          <div>
            <p>是否确认铲除 {PLANTS[plant.type].name}？</p>
            <p className="text-red-500">
              铲除后将失去该植物，且需要支付 ¥{removeCost} 的铲除费用
            </p>
          </div>
        ),
        okText: "确认",
        cancelText: "取消",
        onOk: () => {
          dispatch({ type: "REMOVE_PLANT", id: plantId });
        },
      });
    } catch (error) {
      message.error("操作失败，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveAnimal = async (animalId: string) => {
    try {
      const animal = state.grazingAnimals.find((a) => a.id === animalId);
      if (!animal) return;

      await Modal.confirm({
        title: "确认取消放牧",
        content: (
          <div>
            <p>是否确认取消放牧 {ANIMALS[animal.type].name}？</p>
            <p>取消放牧后动物将返回仓库</p>
            <p className="text-red-500">
              取消放牧后需要支付 ¥
              {Math.ceil(ANIMALS[animal.type].purchasePrice * 0.1)} 的取消费用
            </p>
          </div>
        ),
        okText: "确认",
        cancelText: "取消",
        onOk: () => {
          dispatch({ type: "REMOVE_ANIMAL", id: animalId });
          message.success("取消放牧成功");
        },
      });
    } catch (error) {
      message.error("操作失败，请重试");
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
        (plantedCrop.growthTime - (now - plantedCrop.plantedAt))
      );
      return `${plant.name} (还需 ${formatTimeRemaining(timeRemaining)} 成熟)`;
    }

    // 放牧动物时
    if (grazingAnimal) {
      const animal = ANIMALS[grazingAnimal.type];
      // 动物未成熟
      if (!grazingAnimal.isMature) {
        return `${animal.name} (还需 ${formatTimeRemaining(
          (grazingAnimal.maturityTime - (now - grazingAnimal.grazedAt))
        )} 成熟`;
      }
      // 动物成熟，动物产物未成熟
      else if (grazingAnimal.product && !grazingAnimal.product.isMature) {
        return `${animal.name} (动物产物还需 ${formatTimeRemaining(
          (grazingAnimal.product.maturityTime -
            (now - grazingAnimal.product.producedAt))
        )} 成熟)`;
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
              <Check className="w-6 h-6 text-green-600" />
            ) : (
              <Sprout className="w-6 h-6 text-green-600" />
            )}

            <button
              onClick={(e) => {
                e.stopPropagation(); // 阻止事件冒泡
                handleRemovePlant(plantedCrop.id);
              }}
              className="absolute top-1 right-1 p-1 bg-red-100 hover:bg-red-200 rounded-full"
            >
              <X className="w-4 h-4 text-red-600" />
            </button>

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
              // 动物已成熟
              grazingAnimal.product?.isMature ? (
                <Check className="w-6 h-6 text-green-600" />
              ) : (
                grazingAnimal.type === "pig" ? (
                  <PiggyBank className="w-6 h-6 text-amber-600" />
                ) : (
                  <PawPrint className="w-6 h-6 text-amber-600" />
                )
              )
            ) : (
              // 动物未成熟
              grazingAnimal.type === "pig" ? (
                <PiggyBank className="w-6 h-6 text-amber-600" />
              ) : (
                <PawPrint className="w-6 h-6 text-amber-600" />
              )
            )}

            <button
              onClick={(e) => {
                e.stopPropagation(); // 阻止事件冒泡
                handleRemoveAnimal(grazingAnimal.id);
              }}
              className="absolute top-1 right-1 p-1 bg-red-100 hover:bg-red-200 rounded-full"
            >
              <X className="w-4 h-4 text-red-600" />
            </button>

            {/* 进度条 */}
            <div className="absolute bottom-1 left-1 right-1 h-1 bg-gray-200/80 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-1000 ease-linear"
                style={{
                  width: `${grazingAnimal.isMature
                    ? getAnimalProductProgressPercentage()
                    : getAnimalProgressPercentage()}%`
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

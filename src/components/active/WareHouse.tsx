import { useState } from "react";
import { useGameState } from "../../context/GameContext";
import { PLANTS } from "../../utils/plants";
import { ANIMALS,ANIMAL_PRODUCTS } from "../../utils/animals";
import { EQUIPMENT } from "../../utils/equipment";    
import { PlantType } from "../../types/plants";
import { AnimalType,AnimalProductType } from "../../types/animals";
import { EquipmentType } from "../../types/equipment";
import { Wheat, Baby, Milk, Wrench, Sprout, X } from "lucide-react";

type TabType = "seed" | "plant" | "animal" | "animalProduct" | "equipment";

// 批量操作头部组件
const BatchOperationHeader = ({ 
  isBatchSale, 
  setIsBatchSale, 
  selectedItems, 
  allItems,
  setSelectedItems, 
  setShowBatchSaleConfirm 
}) => (
  <div className="flex justify-end mb-4 gap-3">
    {isBatchSale && (
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          className="w-4 h-4 accent-green-500"
          checked={selectedItems.length === allItems.length}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedItems(allItems.map(([type]) => type));
            } else {
              setSelectedItems([]);
            }
          }}
        />
        <span>全选</span>
      </label>
    )}
    <button
      onClick={() => setIsBatchSale(!isBatchSale)}
      className="bg-blue-500 text-white px-4 py-2 rounded-md"
    >
      {isBatchSale ? "取消批量" : "批量出售"}
    </button>
    {isBatchSale && selectedItems.length > 0 && (
      <button
        onClick={() => setShowBatchSaleConfirm(true)}
        className="bg-green-500 text-white px-4 py-2 rounded-md"
      >
        确认出售 ({selectedItems.length})
      </button>
    )}
  </div>
);

// 仓库物品卡片组件
const ItemCard = ({
  type,
  count,
  name,
  price,
  bgColor,
  isBatchSale,
  selectedItems,
  setSelectedItems,
  saleQuantity,
  setSaleQuantity,
  onSale
}) => (
  <div 
    className={`${bgColor} p-3 rounded-lg ${
      isBatchSale && selectedItems.includes(type) ? 'ring-2 ring-green-500' : ''
    }`}
  >
    <div className="flex items-center gap-2 mb-2">
      {isBatchSale && (
        <input
          type="checkbox"
          className="w-4 h-4 accent-green-500"
          checked={selectedItems.includes(type)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedItems([...selectedItems, type]);
            } else {
              setSelectedItems(selectedItems.filter(item => item !== type));
            }
          }}
        />
      )}
      <div className="font-medium">{name}</div>
    </div>
    <div className="text-sm text-gray-600">数量: {count}</div>
    <div className="text-sm text-green-600">售价: ¥{price}</div>
    <div className="mt-2 flex items-center gap-2">
      <input
        type="number"
        min="1"
        max={count}
        value={saleQuantity[type] || 1}
        onChange={(e) => {
          const value = Math.min(
            Math.max(1, parseInt(e.target.value) || 1),
            count
          );
          setSaleQuantity((prev) => ({
            ...prev,
            [type]: value,
          }));
        }}
        className="w-20 px-2 py-1 border rounded text-sm"
      />
      {!isBatchSale && (
        <button
          onClick={() => onSale(type, saleQuantity[type] || 1)}
          className="bg-green-500 text-white px-3 py-1 rounded-md text-sm"
        >
          出售
        </button>
      )}
    </div>
  </div>
);

const Warehouse = () => {
  const [activeTab, setActiveTab] = useState<TabType>("seed");
  const { state, dispatch } = useGameState();
  const [isBatchSale, setIsBatchSale] = useState(false);
  const [saleQuantity, setSaleQuantity] = useState<{ [key: string]: number }>(
    {}
  );
  const [showBatchSaleConfirm, setShowBatchSaleConfirm] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const tabs = [
    { id: "seed", label: "种子", icon: Sprout },
    { id: "plant", label: "成熟作物", icon: Wheat },
    { id: "animal", label: "动物", icon: Baby },
    { id: "animalProduct", label: "动物产品", icon: Milk },
    { id: "equipment", label: "道具", icon: Wrench },
  ] as const;

  const closeShop = () => {
    dispatch({ type: "SELECT_ACTION", action: null });
  };
  // 出售种子
  const handleSaleSeed = (seedType: PlantType | string, quantity: number) => {
    dispatch({
      type: "SELL_SEED",
      seedType,
      count: quantity,
    });
    // 重置该物品的销售数量
    setSaleQuantity((prev) => ({
      ...prev,
      [seedType]: 1,
    }));
  };
  // 出售成熟作物
  const handleSalePlant = (plantType: PlantType | string, count: number) => {
    dispatch({
      type: "SELL_PLANT",
      plantType,
      count,
    });
    // 重置该物品的销售数量
    setSaleQuantity((prev) => ({
      ...prev,
      [plantType]: 1,
    }));
  };
  // 出售动物幼崽
  const handleSaleAnimal = (animalType: AnimalType | string, count: number) => {
    dispatch({
      type: "SELL_ANIMAL",
      animalType,
      count,
    });
    // 重置该物品的销售数量
    setSaleQuantity((prev) => ({
      ...prev,
      [animalType]: 1,
    }));
  };
  // 出售动物产品
  const handleSaleAnimalProduct = (animalProductType: AnimalProductType | string, count: number) => {
    dispatch({
      type: "SELL_ANIMAL_PRODUCT",
      animalProductType,
      count,
    });
    // 重置该物品的销售数量
    setSaleQuantity((prev) => ({
      ...prev,
      [animalProductType]: 1,
    }));
  };
  // 出售道具
  const handleSaleEquipment = (equipmentType: EquipmentType | string, count: number) => {
    dispatch({
      type: "SELL_EQUIPMENT",
      equipmentType,
      count,
    });
    // 重置该物品的销售数量
    setSaleQuantity((prev) => ({
      ...prev,
      [equipmentType]: 1,
    }));
  };

  const handleBatchSale = () => {
    selectedItems.forEach((type) => {
      const quantity = saleQuantity[type] || 1;
      switch (activeTab) {
        case "seed":
          handleSaleSeed(type, quantity);
          break;
        case "plant":
          handleSalePlant(type, quantity);
          break;
        case "animal":
          handleSaleAnimal(type, quantity);
          break;
        case "animalProduct":
          handleSaleAnimalProduct(type, quantity);
          break;
        case "equipment":
          handleSaleEquipment(type, quantity);
          break;
      }
    });
    setSelectedItems([]);
    setShowBatchSaleConfirm(false);
    setIsBatchSale(false);
      };

    // 渲染相应的内容
    const renderContent = () => {
      switch (activeTab) {
        case "seed": {
          const seedItems = Object.entries(state.warehouse.seeds).filter(([_, count]) => count > 0);
          if (seedItems.length === 0) {
            return (
              <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                <Sprout className="w-12 h-12 mb-2" />
                <p>还没有种子哦，快去商店购买吧！</p>
              </div>
            );
          }
          return (
            <>
              <BatchOperationHeader
                isBatchSale={isBatchSale}
                setIsBatchSale={setIsBatchSale}
                selectedItems={selectedItems}
                allItems={seedItems}
                setSelectedItems={setSelectedItems}
                setShowBatchSaleConfirm={setShowBatchSaleConfirm}
              />
              <div className="grid grid-cols-2 gap-3">
                {seedItems.map(([type, count]) => (
                  <ItemCard
                    key={type}
                    type={type}
                    count={count}
                    name={PLANTS[type].name}
                    price={PLANTS[type].purchasePrice}
                    bgColor="bg-green-50"
                    isBatchSale={isBatchSale}
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                    saleQuantity={saleQuantity}
                    setSaleQuantity={setSaleQuantity}
                    onSale={handleSaleSeed}
                  />
                ))}
              </div>
            </>
          );
        }
        case "plant": {
          const plantItems = Object.entries(state.warehouse.plants || {}).filter(([_, count]) => count > 0);
          if (plantItems.length === 0) {
            return (
              <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                <Wheat className="w-12 h-12 mb-2" />
                <p>还没有收获的作物，继续努力种植吧！</p>
              </div>
            );
          }
          return (
            <>
              <BatchOperationHeader
                isBatchSale={isBatchSale}
                setIsBatchSale={setIsBatchSale}
                selectedItems={selectedItems}
                allItems={plantItems}
                setSelectedItems={setSelectedItems}
                setShowBatchSaleConfirm={setShowBatchSaleConfirm}
              />
              <div className="grid grid-cols-2 gap-3">
                {plantItems.map(([type, count]) => (
                  <ItemCard
                    key={type}
                    type={type}
                    count={count}
                    name={PLANTS[type].name}
                    price={PLANTS[type].price}
                    bgColor="bg-amber-50"
                    isBatchSale={isBatchSale}
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                    saleQuantity={saleQuantity}
                    setSaleQuantity={setSaleQuantity}
                    onSale={handleSalePlant}
                  />
                ))}
              </div>
            </>
          );
        }
        case "animal": {
          const animalItems = Object.entries(state.warehouse.ownedAnimals || {}).filter(([_, count]) => count > 0);
          if (animalItems.length === 0) {
            return (
              <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                <Baby className="w-12 h-12 mb-2" />
                <p>还没有动物哦，快去商店购买吧！</p>
              </div>
            );
          }
          return (
            <>
              <BatchOperationHeader
                isBatchSale={isBatchSale}
                setIsBatchSale={setIsBatchSale}
                selectedItems={selectedItems}
                allItems={animalItems}
                setSelectedItems={setSelectedItems}
                setShowBatchSaleConfirm={setShowBatchSaleConfirm}
              />
              <div className="grid grid-cols-2 gap-3">
                {animalItems.map(([type, count]) => (
                  <ItemCard
                    key={type}
                    type={type}
                    count={count}
                    name={ANIMALS[type].name}
                    price={ANIMALS[type].price}
                    bgColor="bg-blue-50"
                    isBatchSale={isBatchSale}
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                    saleQuantity={saleQuantity}
                    setSaleQuantity={setSaleQuantity}
                    onSale={handleSaleAnimal}
                  />
                ))}
              </div>
            </>
          );
        }
        case "animalProduct": {
          const animalProductItems = Object.entries(state.warehouse.animalProducts || {}).filter(([_, count]) => count > 0);
          if (animalProductItems.length === 0) {
            return (
              <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                <Milk className="w-12 h-12 mb-2" />
                <p>还没有动物产品，继续照顾动物吧！</p>
              </div>
            );
          }
          return (
            <>
              <BatchOperationHeader
                isBatchSale={isBatchSale}
                setIsBatchSale={setIsBatchSale}
                selectedItems={selectedItems}
                allItems={animalProductItems}
                setSelectedItems={setSelectedItems}
                setShowBatchSaleConfirm={setShowBatchSaleConfirm}
              />
              <div className="grid grid-cols-2 gap-3">
                {animalProductItems.map(([type, count]) => (
                  <ItemCard
                    key={type}
                    type={type}
                    count={count}
                    name={ANIMAL_PRODUCTS[type].name}
                    price={ANIMAL_PRODUCTS[type].price}
                    bgColor="bg-rose-50"
                    isBatchSale={isBatchSale}
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                    saleQuantity={saleQuantity}
                    setSaleQuantity={setSaleQuantity}
                    onSale={handleSaleAnimalProduct}
                  />
                ))}
              </div>
            </>
          );
        }
        case "equipment": {
          const equipmentItems = Object.entries(state.warehouse.equipments).filter(([_, count]) => count > 0);
          if (equipmentItems.length === 0) {
            return (
              <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                <Wrench className="w-12 h-12 mb-2" />
                <p>还没有道具哦，快去商店购买吧！</p>
              </div>
            );
          }
          return (
            <>
              <BatchOperationHeader
                isBatchSale={isBatchSale}
                setIsBatchSale={setIsBatchSale}
                selectedItems={selectedItems}
                allItems={equipmentItems}
                setSelectedItems={setSelectedItems}
                setShowBatchSaleConfirm={setShowBatchSaleConfirm}
              />
              <div className="grid grid-cols-2 gap-3">
                {equipmentItems.map(([type, count]) => (
                  <ItemCard
                    key={type}
                    type={type}
                    count={count}
                    name={EQUIPMENT[type].name}
                    price={EQUIPMENT[type].price}
                    bgColor="bg-purple-50"
                    isBatchSale={isBatchSale}
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                    saleQuantity={saleQuantity}
                    setSaleQuantity={setSaleQuantity}
                    onSale={handleSaleEquipment}
                  />
                ))}
              </div>
            </>
          );
        }
      }
    };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">仓库</h2>
          <button onClick={closeShop} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4">
          {/* Tab标题 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as TabType)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === id
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </button>
            ))}
          </div>
          {/* 内容 */}
          <div className="min-h-[200px]">{renderContent()}</div>
        </div>
      </div>
      
      {/* 添加批量出售确认弹窗 */}
      {showBatchSaleConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-4">确认批量出售</h3>
            <p>是否确认出售选中的 {selectedItems.length} 个物品？</p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setShowBatchSaleConfirm(false)}
                className="px-4 py-2 bg-gray-200 rounded-md"
              >
                取消
              </button>
              <button
                onClick={handleBatchSale}
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                确认
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Warehouse;

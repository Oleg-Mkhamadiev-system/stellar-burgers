
function ConstructorIngredient () {

  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: () => {
        return { id: ingridient.id, index: index };
    },
    collect: (monitor) => ({
        isDrag: monitor.isDragging(),
    }),
  });

  const [{ itemId }, drop] = useDrop({
    accept: "component",
    collect(monitor) {
        return {
          itemId: monitor.getItemId(),
        };
     },
  });

  return (
    <li className={`${isDrag } ${styles.componentsItem}`}
      key={ingredient._id + index} ref={dragRef}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                            extraClass="mb-4"
                            key={ingredient._id}
                            isLocked={false}
                            text={`${ingredient.name}`}
                            price={ingredient.price}
                            thumbnail={ingredient["image_mobile"]}
                            />
                        </li>
  );
};

export default ConstructorIngredient;

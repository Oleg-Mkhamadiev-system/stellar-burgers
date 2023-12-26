import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement, DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef } from "react";
import { deleteIngredient } from "../../services/constructorIngredients/actions";

function CurrentIngredient ({ ingredient, id, index, moveItemIngredient }) {
  const ref = useRef(null);

  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: () => {
        return { id: id, index: index };
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
     hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveItemIngredient(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  dragRef(drop(ref));

  function deleteItem () {
    dispatch(deleteIngredient(data));
  }

  return (
    <li className={`${isDrag } ${styles.componentsItem}`}
      key={ingredient._id + index} ref={dragRef} data-item-id={itemId} draggable id={id}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                            extraClass="mb-4"
                            key={ingredient._id}
                            isLocked={false}
                            text={`${ingredient.name}`}
                            price={ingredient.price}
                            thumbnail={ingredient["image_mobile"]}
                            handleClose={deleteItem}
                            />
                        </li>
  );
};

CurrentIngredient.propTypes = {
  ingredient: PropTypes.object,
  moveItemIngredient: PropTypes.func,
  index: PropTypes.number
};

export default CurrentIngredient;

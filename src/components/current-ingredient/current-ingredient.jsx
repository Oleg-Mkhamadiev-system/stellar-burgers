import styles from './current-ingredient.module.css';
import React from 'react';
import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement, DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef } from "react";
import { deleteIngredient } from "../../services/constructorIngredients/actions";
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";

function CurrentIngredient ({ item, id, index, moveItemIngredient }) {
  const ref = useRef(null);
  const dispatch = useDispatch();

  const [{ isDrag }, dragRef] = useDrag({
    type: "movableIngredient",
    item: () => {
        return { id: id, index: index };
    },
    collect: (monitor) => ({
        isDrag: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, drop] = useDrop({
    accept: "movableIngredient",
    collect: monitor => {
        return {
          handlerId: monitor.getHandlerId(),
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
    dispatch(deleteIngredient(item));
  }

  return (
    <div className={`${styles.componentsItem} ${isDrag && styles.containerDraggable}`}
      ref={dragRef} data-handler-id={handlerId} id={id}>
                      <DragIcon type="primary" />
                      <ConstructorElement
                        extraClass="mb-4"
                        key={item._id}
                        isLocked={false}
                        text={`${item.name}`}
                        price={item.price}
                        thumbnail={item["image_mobile"]}
                        handleClose={deleteItem}
                      />
      </div>
    );
  };

CurrentIngredient.propTypes = {
  item: PropTypes.object,
  moveItemIngredient: PropTypes.func,
  id: PropTypes.string,
  index: PropTypes.number
};

export default CurrentIngredient;

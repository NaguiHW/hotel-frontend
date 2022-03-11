import { ChangeEventHandler, FormEventHandler } from "react";
import styles from "../../styles/Modal.module.scss";

const Modal = ({
  handleSubmit,
  type,
  closeModal,
  handleChange
} : {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  type: string;
  closeModal: Function;
  handleChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
}) => (
  <div className={styles.modalBackground}>
    <button onClick={() => closeModal(false)}>X</button>
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name: </label>
      <input type="text" name="name" id="name" onChange={handleChange} />
      <label htmlFor="category">Category:</label>
      <select name="category" id="category" onChange={handleChange}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <label htmlFor="price">Price:</label>
      <input type="number" name="price" id="price" onChange={handleChange} />
      <label htmlFor="photos">Photos: </label>
      <input type="text" name="photos" id="photos" onChange={handleChange} />
      <button type="submit">{type === 'create' ? 'Create' : 'Update'}</button>
    </form>
  </div>
);

export default Modal;

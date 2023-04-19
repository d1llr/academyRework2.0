import React, { Children, useState } from 'react';
import { Button, Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import FeedBackForm from '../Forms/FeedBackForm/FeedBackForm'
import { closeModal } from '../../../redux/slices/modalSlice';
import styles from './styles.module.scss'


const ModalFeedBack: React.FC = () => {
    const modal = useAppSelector(state => state.modal)
    const dispatch = useAppDispatch()

    // const [isModalOpen, setIsModalOpen] = useState(modal);

    const showModal = () => {

    };

    const handleOk = () => {

    };

    const handleCancel = () => {
        dispatch(closeModal(true))
    };

    return <Modal
        title="Оставьте заявку"
        open={modal.isOpen}
        onCancel={handleCancel}
        className={styles.modal_container}
        footer={null}
    >
        <FeedBackForm />
    </Modal>
};

export default ModalFeedBack;
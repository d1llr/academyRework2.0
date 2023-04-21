import React, { Children, useState } from 'react';
import { Button, Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import FeedBackForm from '../Forms/FeedBackForm/FeedBackForm'
import { closeModal } from '../../../redux/slices/modalSlice';
import styles from './styles.module.scss'



interface props{
    title: string
}

const UniverseModal: React.FC<props> = ({title}:props) => {
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
        title={title}
        open={modal.isOpen}
        onCancel={handleCancel}
        className={styles.modal_container}
        footer={null}
        destroyOnClose = {true}
    >
        <FeedBackForm />
    </Modal>
};

export default UniverseModal;
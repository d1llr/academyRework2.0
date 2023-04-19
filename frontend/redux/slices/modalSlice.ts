import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isOpen: false
}

export const modal = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isOpen = true
        },
        closeModal: (state, action) => {
            state.isOpen = false
        }
    },
})

export const {openModal, closeModal} = modal.actions


export default modal.reducer

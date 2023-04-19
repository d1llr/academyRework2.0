import '../styles/global.scss';
import Layout from '../components/PageComponents/Layout/Layout';
import { Provider } from 'react-redux';
import store, { useAppDispatch, useAppSelector, wrapper } from '../redux/store';
import ModalFeedBack from '../components/UniversalComponents/ModalFeedBack/ModalFeedBack.tsx'
import { openModal } from '../redux/slices/modalSlice';

function MyApp({ Component, pageProps }) {
    const isOpen = useAppSelector(state => state.modal)
    return (
        <Provider store={store}>
            <Layout>
                {isOpen && <ModalFeedBack />}
                <Component {...pageProps} />
            </Layout>
        </Provider>
    );
}


export default wrapper.withRedux(MyApp)

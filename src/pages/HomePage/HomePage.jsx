import Header from '../../components/Header/Header';

const HomePage = (props) => {
    const { setUserData } = props;

    return (
        <>
            <Header setUserData={setUserData} />
        </>
    );
};

export default HomePage;

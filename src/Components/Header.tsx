interface Props {
    payload: string
};

const Header = (props : Props) => {
    return (
        <h1 className="text-5xl font-bold text-center mb-4">
            {props.payload}
        </h1>
    );
};

export default Header;
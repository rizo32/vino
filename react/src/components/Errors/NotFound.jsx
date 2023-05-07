const NotFound = ({ handleBackClick }) => {
    return (
        <div className="flex flex-col w-10/12 ml-auto mr-auto">
            <h1 className="text-lg font-bold">404: Page non trouvée</h1>
            <p className="mt-4">
                Oupsi, il semble que nous ayons égaré la page que vous
                cherchez!
            </p>
            <button
                className="btn btn-block bg-red-900 rounded-md text-white h-12 text-xl shadow-shadow-tiny hover:shadow-none hover:bg-red-hover active:bg-red-hover active:shadow-none absolute bottom-36 left-1/2 transform -translate-x-1/2 w-10/12"
                onClick={handleBackClick}
            >
                Retour
            </button>
        </div>
    );
};

export default NotFound;

// formulaire pour changer les informations
function UserForm({ user, onChange, onSubmit, onReturn, message, setMessage }) {
    return (
        <form
            className="flex flex-col w-10/12 ml-auto mr-auto"
            onSubmit={onSubmit}
        >
            <label htmlFor="first-name" className="mt-vh-3 ml-2">
                Prénom
                {message.first_name && (
                    <span className="text-red-900 text-sm pl-2">
                        {message.first_name[0]}
                    </span>
                )}
            </label>
            <input
                type="text"
                name="first_name"
                value={user.first_name}
                className="rounded-lg bg-white h-8 pl-2 shadow-shadow-tiny-inset"
                onChange={onChange}
            />
            <label htmlFor="last-name" className="mt-vh-2 ml-2">
                Nom de famille
                {message.last_name && (
                    <span className="text-red-900 text-sm pl-2">
                        {message.last_name[0]}
                    </span>
                )}
            </label>
            <input
                type="text"
                name="last_name"
                value={user.last_name}
                className="rounded-lg bg-white h-8 pl-2 shadow-shadow-tiny-inset"
                onChange={onChange}
            />
            <label htmlFor="email" className="mt-vh-2 ml-2">
                Courriel
                {message.email && (
                    <span className="text-red-900 text-sm pl-2">
                        {message.email[0]}
                    </span>
                )}
            </label>
            <input
                type="email"
                name="email"
                value={user.email}
                className="rounded-lg bg-white h-8 pl-2 shadow-shadow-tiny-inset"
                onChange={onChange}
            />
            <label htmlFor="password" className="mt-vh-2 ml-2">
                Mot de passe
                {message.password && (
                    <span className="text-red-900 text-sm pl-2">
                        {message.password[0]}
                    </span>
                )}
            </label>
            <input
                id="password"
                type="password"
                name="password"
                placeholder="********"
                className="rounded-lg bg-white h-8 pl-2 shadow-shadow-tiny-inset"
                onChange={onChange}
            />
            <label
                htmlFor="password-confirmation"
                className="mt-vh-2 text ml-2"
            >
                Confirmation
            </label>
            <input
                id="password-confirmation"
                type="password"
                name="password_confirmation"
                placeholder="********"
                className="rounded-lg bg-white h-8 pl-2 shadow-shadow-tiny-inset mt-2"
                onChange={onChange}
            />
            <button
                type="submit"
                className="btn btn-block mt-8 bg-red-900 rounded-md text-white h-8 text-lg shadow-shadow-tiny hover:shadow-none hover:bg-red-hover"
            >
                Enregistrer
            </button>
            <div className="text-center absolute bottom-20 left-1/2 transform -translate-x-1/2 w-10/12">
                <p className="cursor-pointer" onClick={onReturn}>
                    {"<"} Retour
                </p>
            </div>
        </form>
    );
}

export default UserForm;

// affiche les données utilisateurs
function UserDisplay({ user, onEdit }) {
  return (
    <div className="flex flex-col w-10/12 ml-auto mr-auto">
      <p className="mt-vh-3 ml-2">Prénom</p>
      <p className="pt-1 h-8 pl-2">{user.first_name}</p>
      <p className="mt-vh-2 ml-2">Nom de famille</p>
      <p className="pt-1 h-8 pl-2">{user.last_name}</p>
      <p className="mt-vh-2 ml-2">Courriel</p>
      <p className="pt-1 h-8 pl-2">{user.email}</p>

      {/* J'utilise un bouton plus discret ici puisqu'il n'est pas important */}
      <button
        type="button"
        className="btn btn-block mt-8 border-black border-2 rounded-md text-black h-8 text-lg shadow-shadow-tiny hover:shadow-none hover:bg-rose-hover"
        onClick={onEdit}
      >
        Modifier les informations
      </button>
    </div>
  );
}

export default UserDisplay;
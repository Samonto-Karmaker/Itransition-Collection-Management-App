const RemoveCredentials = (setUser) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
};

export default RemoveCredentials;
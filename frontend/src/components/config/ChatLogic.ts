export const getSender = (loggedUser, user, isSearching) => {
  const result = !isSearching
    ? user?.name
    : user.users[0]?._id === loggedUser?._id
    ? user.users[1]?.name
    : user.users[0]?.name

  return result
}

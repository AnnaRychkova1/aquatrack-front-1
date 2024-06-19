export const UserMenu = () => {
  //   const { isSignedIn } = useAuth();
  const isSignedIn = false;
  return (
    <>
      {isSignedIn && (
        <div>
          <p>Welcome!</p>
          <button type="button">Setting</button>
          <button type="button">Log out</button>
        </div>
      )}
    </>
  );
};

import React from "react";

export const UserList = () => {
    const { auth } = useAuth();
// Estado para ontener los usuarios
const [users, setUsers] = useState([]);
    const follow = async (userId) => {
        const request = await fetch(Global.url + "follow/save", {
          method: "POST",
          body: JSON.stringify({ followed: userId }),
          headers: {
            "Content-type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        });
        const data = await request.json();
        if (data.status == "success") {
          setFollowing([...following, userId]);
        }
      };
      const unfollow = async (userId) => {
        const request = await fetch(Global.url + "follow/unfollow/" + userId, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        });
        const data = await request.json();
        console.log(data);
        if (data.status == "success") {
          let filterFollowings = following.filter(
            (followingUserId) => userId !== followingUserId
          );
          setFollowing(filterFollowings);
        }
      };
  return (
   
      <div className="content__posts">
        {users.map((user) => {
          return (
            <article className="posts__post" key={user._id}>
              <div className="post__container">
                <div className="post__image-user">
                  <a href="#" className="post__image-link">
                    {user.image != "default.png" && (
                      <img
                        src={Global.url + "user/uploads/" + user.image}
                        className="post__user-image"
                        alt="Foto de perfil"
                      />
                    )}
                    {user.image == "default.png" && (
                      <img
                        src={avatar}
                        className="post__user-image"
                        alt="Foto de perfil"
                      />
                    )}
                  </a>
                </div>

                <div className="post__body">
                  <div className="post__user-info">
                    <a href="#" className="user-info__name">
                      {user.name} {user.surname}
                    </a>
                    <span className="user-info__divider"> | </span>
                    <a href="#" className="user-info__create-date">
                      {user.create__at}
                    </a>
                  </div>

                  <h4 className="post__content">{user.bio}</h4>
                </div>
              </div>
              {user._id != auth._id && (
                <div className="post__buttons">
                  {!following.includes(user._id) && (
                    <button
                      className="post__button post__button--green"
                      onClick={() => follow(user._id)}
                    >
                      seguir
                    </button>
                  )}
                  {following.includes(user._id) && (
                    <button
                      className="post__button"
                      onClick={() => unfollow(user._id)}
                    >
                      Dejar de seguir
                    </button>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>
    
  );
};

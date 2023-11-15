import { useEffect, useState } from "react";

import { Global } from "../helpers/Global";

import UserList from "./UserList";

export const People = () => {
 

  return (
    <>
      <header className="content__header">
        <h1 className="content__title">Gente</h1>
      </header>
      <UserList
        users={users}
        getUsers={setUsers}
        following={following}
        setFollowing={setFollowing}
        loading={loading}
        more={more}
        page={page}
        setPage={setPage}
      />
    </>
  );
};

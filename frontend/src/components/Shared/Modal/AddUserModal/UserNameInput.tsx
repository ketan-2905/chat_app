"use client";
import useCreateConversation from '@/hooks/useCreateConversation';
import Loader from '../../Loader';

const UserNameInput = () => {
  const { loading, search, setSearch } = useCreateConversation();
  
  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col justify-start items-start gap-2 text-copy-primary">
          <label htmlFor="userName">Username</label>
          <div className="flex gap-2 items-center">
            <input
              id="userName"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Enter username"
              className="border-2 border-border bg-background px-2 py-1"
            />
            {loading && <Loader />}
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserNameInput;
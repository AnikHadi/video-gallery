import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../../../features/videos/videosSlice";
import HeaderFilter from "../../HomePage/HeaderFilter/HeaderFilter";
import SingleVideo from "../../HomePage/SingleVideo/SingleVideo";
import Loading from "../../UI/Loading/Loading";
import Pagination from "../../UI/Pagination/Pagination";

const HomePage = () => {
  const dispatch = useDispatch();
  const { videos, isLoading, isError, error } = useSelector(
    (state) => state.videos
  );
  const { tags, searchText } = useSelector((state) => state.filter);

  useEffect(() => {
    dispatch(fetchVideos({ tags, searchText }));
  }, [dispatch, tags, searchText]);

  // something
  let contain;
  if (isLoading) contain = <Loading />;
  if (!isLoading && isError)
    contain = <div className="col-span-12">{error}</div>;

  if (!isError && !isLoading && videos?.length === 0)
    contain = <div className="col-span-12">No video found!</div>;
  if (!isError && !isLoading && videos?.length > 0)
    contain = videos.map((video) => (
      <SingleVideo key={video.id} video={video} />
    ));

  return (
    <>
      <HeaderFilter />
      <section className="pt-12">
        <section className="pt-12">
          <div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto px-5 lg:px-0 min-h-[300px]">
            {/* <!-- single video --> */}
            {contain}
          </div>
        </section>
      </section>
      <Pagination />
    </>
  );
};

export default HomePage;

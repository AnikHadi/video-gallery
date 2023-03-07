import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRelatedVideos } from "../../../features/relatedVideos/relatedVideosSlice";
import Loading from "../../UI/Loading/Loading";
import SingleRelatedVideo from "../SingleRelatedVideo/SingleRelatedVideo";

const RelatedVideo = ({ currentVideoID, tags }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRelatedVideos({ tags, id: currentVideoID }));
  }, [dispatch, tags, currentVideoID]);

  const {
    relatedVideos = [],
    isLoading,
    isError,
    error,
  } = useSelector((state) => state.relatedVideos);

  // decide what to render
  let contain = null;
  if (isLoading) contain = <Loading />;
  if (!isLoading && isError)
    contain = <div className="col-span-12">{error}</div>;

  if (!isError && !isLoading && relatedVideos.length === 0)
    contain = <div className="col-span-12">No related Videos found!</div>;
  if (!isError && !isLoading && relatedVideos.length > 0)
    contain = relatedVideos.map((video) => (
      <SingleRelatedVideo video={video} key={video.id} />
    ));

  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
      {/* <!-- single related video --> */}
      {contain}
    </div>
  );
};

export default RelatedVideo;

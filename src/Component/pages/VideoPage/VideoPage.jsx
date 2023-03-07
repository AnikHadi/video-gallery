import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchVideo } from "../../../features/video/videoSlice";
import Loading from "../../UI/Loading/Loading";
import RelatedVideo from "../../VideoPages/RelatedVideo/RelatedVideo";
import VideoDescription from "../../VideoPages/VideoDescription/VideoDescription";
import VideoPlayer from "../../VideoPages/VideoPlayer/VideoPlayer";

const VideoPage = () => {
  const dispatch = useDispatch();
  const { VideoId } = useParams();
  useEffect(() => {
    dispatch(fetchVideo(VideoId));
  }, [dispatch, VideoId]);
  const { video, isLoading, isError, error } = useSelector(
    (state) => state.video
  );
  const { id, title = "", link = "", tags = [] } = video;
  // decide what to render
  let contain = null;
  if (isLoading) contain = <Loading />;
  if (!isLoading && isError)
    contain = <div className="col-span-12">{error}</div>;

  if (!isError && !isLoading && !video.id)
    contain = <div className="col-span-12">No video found!</div>;
  if (!isError && !isLoading && video?.id)
    contain = (
      <div className="grid grid-cols-3 gap-2 lg:gap-8">
        <div className="col-span-full w-full space-y-8 lg:col-span-2">
          <VideoPlayer link={link} title={title} />

          <VideoDescription video={video} />
        </div>

        <RelatedVideo currentVideoID={id} tags={tags} />
      </div>
    );
  return (
    <section className="pt-6 pb-20">
      <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
        {contain}
      </div>
    </section>
  );
};

export default VideoPage;

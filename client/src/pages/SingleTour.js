import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { getRelatedTours, getTour } from "../redux/features/tourSlice";
import RelatedTours from "../components/RelatedTours";
import DisqusThread from "../components/DisqusThread";

const SingleTour = () => {
  const dispatch = useDispatch();
  const { tour, relatedTours } = useSelector((state) => ({ ...state.tour }));
  const { id } = useParams();
  const navigate = useNavigate();
  const tags = tour?.tags;

  useEffect(() => {
    tags && dispatch(getRelatedTours(tags));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  useEffect(() => {
    if (id) {
      dispatch(getTour(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });
  return (
    <>
      <MDBContainer>
        <MDBCard className="mb-3 mt-2">
          <MDBCardImage
            position="top"
            style={{ maxWidth: "100%", height: "100%", backgroundSize: "cover" }}
            src={tour?.imageFile}
            alt={tour?.title}
          />
          <MDBCardBody>
            <MDBBtn
              tags="a"
              color="none"
              style={{ float: "left", color: "#000" }}
              onClick={() => navigate("/")}
            >
              <FontAwesomeIcon
                size="lg"
                icon={faArrowLeftLong}
                style={{ float: "left" }}
              />
            </MDBBtn>

            <h3>{tour?.title}</h3>
            <span>
              <p className="text-start tourName">Created by: {tour?.name}</p>
            </span>
            <div style={{ float: "left" }}>
              <span className="text-start">
                {tour?.tags?.map((item) => `#${item}`)}
              </span>
            </div>
            <br />
            <MDBCardText className="text-start mt-2">
              <FontAwesomeIcon
                style={{ float: "left", margin: "5px" }}
                icon={faCalendar}
                size="lg"
              />
              <small className="text-muted">
                {moment(tour?.createdAt).fromNow()}
              </small>
            </MDBCardText>
            <MDBCardText className="load mb-0 text-start">
              {tour?.description}
            </MDBCardText>
          </MDBCardBody>
          <RelatedTours relatedTours={relatedTours} tourId={id} />
        </MDBCard>
        <DisqusThread id={id} title={tour.title} path={`/tour/${id}`} />
      </MDBContainer>
    </>
  );
};

export default SingleTour;

import { describe, expect, it } from "vitest";
import { normalizeTripBookingReviewMe, normalizeTripBookingReviewPublicPage } from "./tripBookingReviewNormalize";

describe("tripBookingReviewNormalize", () => {
  it("normalizeTripBookingReviewMe returns empty review when hasReview=false", () => {
    expect(normalizeTripBookingReviewMe({ hasReview: false })).toEqual({ hasReview: false, review: undefined });
  });

  it("normalizeTripBookingReviewMe drops incomplete review payloads", () => {
    expect(
      normalizeTripBookingReviewMe({
        hasReview: true,
        review: { id: 1 },
      }),
    ).toEqual({ hasReview: false, review: undefined });
  });

  it("normalizeTripBookingReviewMe parses a complete review", () => {
    expect(
      normalizeTripBookingReviewMe({
        hasReview: true,
        review: {
          id: 9,
          bookingId: "abc",
          status: "PENDING_MODERATION",
          rating: 5,
          comment: "ok",
          revieweeId: 3,
          createdAt: 1,
          canEdit: true,
          editableUntil: 2,
          moderatorComment: "nope",
        },
      }),
    ).toEqual({
      hasReview: true,
      review: {
        id: 9,
        bookingId: "abc",
        status: "PENDING_MODERATION",
        rating: 5,
        comment: "ok",
        revieweeId: 3,
        createdAt: 1,
        canEdit: true,
        editableUntil: 2,
        moderatorComment: "nope",
      },
    });
  });

  it("normalizeTripBookingReviewPublicPage defaults missing fields", () => {
    expect(normalizeTripBookingReviewPublicPage({})).toEqual({
      totalElements: 0,
      totalPages: 1,
      size: 0,
      content: [],
      number: 0,
      numberOfElements: 0,
      first: true,
      last: true,
      empty: true,
    });
  });
});

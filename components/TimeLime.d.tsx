/**
 * Post 게시글 구조
 */
export interface IPostType {
  id: string;
  /**작성자 유저 ID */
  userId: string;

  /**작성 날짜 */
  CreatedAt: number;

  /**작성 내용 */
  caption: string;

  /**작성자 별칭칭 */
  nickname: string;

  /** 작성글 첨부사진진*/
  photos: string[];
}

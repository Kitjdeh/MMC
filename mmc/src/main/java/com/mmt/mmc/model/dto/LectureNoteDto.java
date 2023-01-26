package com.mmt.mmc.model.dto;

import com.mmt.mmc.entity.LectureNote;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@NoArgsConstructor
public class LectureNoteDto {
	private int lectureNoteId;
	private int questionId;
	private int lectureTime;
	private String pdfUrl;

	public LectureNote toEntity(){
		LectureNote build = LectureNote.builder()
			.lectureNoteId(lectureNoteId)
			.questionId(questionId)
			.lectureTime(lectureTime)
			.pdfUrl(pdfUrl)
			.build();
		return build;
	}

	@Builder
	public LectureNoteDto(int lectureNoteId, int questionId, int lectureTime, String pdfUrl) {
		this.lectureNoteId = lectureNoteId;
		this.questionId = questionId;
		this.lectureTime = lectureTime;
		this.pdfUrl = pdfUrl;
	}
}

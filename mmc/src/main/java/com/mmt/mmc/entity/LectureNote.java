package com.mmt.mmc.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
public class LectureNote {
	@Id
	@GeneratedValue
	private int lectureNoteId;

	@Column
	private int questionId;

	@Column
	private int lectureTime;

	@Column
	private String pdfUrl;

	@Builder
	public LectureNote(int lectureNoteId, int questionId, int lectureTime, String pdfUrl) {
		this.lectureNoteId = lectureNoteId;
		this.questionId = questionId;
		this.lectureTime = lectureTime;
		this.pdfUrl = pdfUrl;
	}
}

package com.mmt.mmc.entity;

import javax.persistence.*;

import org.hibernate.annotations.ColumnDefault;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
public class LectureNote {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int lectureNoteId;

	@Column(nullable = false)
	private int questionId;

	@Column@ColumnDefault("0")
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

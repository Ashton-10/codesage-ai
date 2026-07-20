from io import BytesIO

from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Paragraph


def generate_review_pdf(review):

    buffer = BytesIO()

    doc = SimpleDocTemplate(buffer)

    styles = getSampleStyleSheet()

    story = []

    story.append(Paragraph("<b>CodeSage AI Review</b>", styles["Title"]))

    story.append(Paragraph(f"<b>Title:</b> {review.title}", styles["Normal"]))

    story.append(Paragraph(f"<b>Language:</b> {review.language}", styles["Normal"]))

    story.append(Paragraph(f"<b>Created:</b> {review.created_at}", styles["Normal"]))

    story.append(Paragraph("<br/>", styles["Normal"]))

    story.append(Paragraph("<b>Code</b>", styles["Heading2"]))

    story.append(
        Paragraph(
            review.code.replace("\n", "<br/>"),
            styles["Code"]
        )
    )

    story.append(Paragraph("<br/>", styles["Normal"]))

    story.append(Paragraph("<b>AI Review</b>", styles["Heading2"]))

    story.append(
        Paragraph(
            review.review.replace("\n", "<br/>"),
            styles["BodyText"]
        )
    )

    doc.build(story)

    buffer.seek(0)

    return buffer
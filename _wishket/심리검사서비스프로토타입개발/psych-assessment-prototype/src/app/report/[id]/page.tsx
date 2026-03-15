import ReportClient from "./ReportClient";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ReportPage({ params }: Props) {
  const { id } = await params;
  return <ReportClient reportId={id} />;
}

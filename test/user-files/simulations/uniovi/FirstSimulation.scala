package uniovi

import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class FirstSimulation extends Simulation {

	val httpProtocol = http
		.baseUrl("https://inrupt.net")
		.inferHtmlResources()
		.acceptHeader("text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8")
		.acceptEncodingHeader("gzip, deflate")
		.acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
		.upgradeInsecureRequestsHeader("1")
		.userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:86.0) Gecko/20100101 Firefox/86.0")

	val headers_0 = Map(
		"Cache-Control" -> "max-age=0",
		"If-Modified-Since" -> "Sat, 26 Oct 1985 08:15:00 GMT",
		"If-None-Match" -> """W/"4f746-7438674ba0"""")

	val headers_2 = Map("Origin" -> "https://inrupt.net")



	val scn = scenario("FirstSimulation")
		.exec(http("request_0")
			.get("/common/popup.html")
			.headers(headers_0))
		.pause(7)
		.exec(http("request_1")
			.get("/authorize?scope=openid&client_id=336b9bba2e38807f78195ed4e44a30d1&response_type=id_token%20token&request=eyJhbGciOiJub25lIn0.eyJyZWRpcmVjdF91cmkiOiJodHRwczovL2lucnVwdC5uZXQvY29tbW9uL3BvcHVwLmh0bWwiLCJkaXNwbGF5IjoicGFnZSIsIm5vbmNlIjoiMGk2Z1gxMmpKQWU4RHFwbE5WNjg0QUw3clhyRXAzaVMzNjAtOEhSZlg2dyIsImtleSI6eyJhbGciOiJSUzI1NiIsImUiOiJBUUFCIiwiZXh0Ijp0cnVlLCJrZXlfb3BzIjpbInZlcmlmeSJdLCJrdHkiOiJSU0EiLCJuIjoiMXlCbjRQbHRIdEFmVW9iQW9sVS1lY1NSWklfcC05VkVWVmduMlVWYV9GMFFudFVpVDRvSWpNNm9WMXlGY2Jma3RvTDFDVXBVMFJfUlNXQjg5bVgyYkZJTHdxTFNKY0pBbzJyQ1FQTUFoajBTcTREeW9HX1dfbTNUX3g4aVNuTVFGb2wwZ2lRV3hGWVhDSmRNd2VXUno5OUhMTHBHeTdLRDR5ZlNxS3JhbElpc0FObWVjMG05UWdnUWlvV2FDLTN4RkVjcUtJRDZnN2owYjdxRDFKS0tpbF9pVUFsd0hldFdPTWJ4eTRzazY0dnY1SnlmLXY1eGdDaWpmYkNPazhXWk15T1VsM2w0aC1Yb0o3VTJwZXJfeVVJUVJ0YnNqRjZ1MEtGaXNRU2FMWWVnMWI4WG9XWWNodlFqWDI5akxrM2dIM0lnWVNkdkZDQ3Y3RjJDRE81YWpRIn19.&state=U5LdKL0h-1Rt4l9dt5x-qMHUbTA3kIISxT9Ehf5xuX4"))
		.pause(1)
		.exec(http("request_2")
			.post("/login/password")
			.headers(headers_2)
			.formParam("username", "uo269763")
			.formParam("password", "PITINgallina0")
			.formParam("response_type", "id_token token")
			.formParam("display", "")
			.formParam("scope", "openid")
			.formParam("client_id", "336b9bba2e38807f78195ed4e44a30d1")
			.formParam("redirect_uri", "https://inrupt.net/common/popup.html")
			.formParam("state", "U5LdKL0h-1Rt4l9dt5x-qMHUbTA3kIISxT9Ehf5xuX4")
			.formParam("nonce", "")
			.formParam("request", "eyJhbGciOiJub25lIn0.eyJyZWRpcmVjdF91cmkiOiJodHRwczovL2lucnVwdC5uZXQvY29tbW9uL3BvcHVwLmh0bWwiLCJkaXNwbGF5IjoicGFnZSIsIm5vbmNlIjoiMGk2Z1gxMmpKQWU4RHFwbE5WNjg0QUw3clhyRXAzaVMzNjAtOEhSZlg2dyIsImtleSI6eyJhbGciOiJSUzI1NiIsImUiOiJBUUFCIiwiZXh0Ijp0cnVlLCJrZXlfb3BzIjpbInZlcmlmeSJdLCJrdHkiOiJSU0EiLCJuIjoiMXlCbjRQbHRIdEFmVW9iQW9sVS1lY1NSWklfcC05VkVWVmduMlVWYV9GMFFudFVpVDRvSWpNNm9WMXlGY2Jma3RvTDFDVXBVMFJfUlNXQjg5bVgyYkZJTHdxTFNKY0pBbzJyQ1FQTUFoajBTcTREeW9HX1dfbTNUX3g4aVNuTVFGb2wwZ2lRV3hGWVhDSmRNd2VXUno5OUhMTHBHeTdLRDR5ZlNxS3JhbElpc0FObWVjMG05UWdnUWlvV2FDLTN4RkVjcUtJRDZnN2owYjdxRDFKS0tpbF9pVUFsd0hldFdPTWJ4eTRzazY0dnY1SnlmLXY1eGdDaWpmYkNPazhXWk15T1VsM2w0aC1Yb0o3VTJwZXJfeVVJUVJ0YnNqRjZ1MEtGaXNRU2FMWWVnMWI4WG9XWWNodlFqWDI5akxrM2dIM0lnWVNkdkZDQ3Y3RjJDRE81YWpRIn19."))

	setUp(scn.inject(atOnceUsers(1))).protocols(httpProtocol)
}
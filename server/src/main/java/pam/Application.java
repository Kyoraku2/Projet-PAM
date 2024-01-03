package pam;

import org.apache.tomcat.util.http.fileupload.FileUploadBase;
import org.apache.tomcat.util.http.fileupload.servlet.ServletRequestContext;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ImportResource;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import javax.servlet.http.HttpServletRequest;

@SpringBootApplication(scanBasePackages= {"pam"})
@EnableWebSecurity
@EnableTransactionManagement
@ImportResource(value = "classpath:spring/application-config.xml")
public class Application {
	public static void main(String[] args) throws Exception {
		SpringApplication.run(Application.class, args);
	}

	@Bean(name = "multipartResolver")
	public CommonsMultipartResolver multipartResolver() {
		return new CommonsMultipartResolver() {
			@Override
			public boolean isMultipart(HttpServletRequest request) {
				return FileUploadBase.isMultipartContent(new ServletRequestContext(request));
			}
		};
	}
}
 
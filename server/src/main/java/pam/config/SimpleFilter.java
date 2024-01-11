package pam.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Component
public class SimpleFilter implements Filter {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    @Override
    public void destroy() {}

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterchain)
            throws IOException, ServletException {
        // Getting the desired path from the request
        String path = ((HttpServletRequest) request).getRequestURI();
        if(path.equals("/api/auth/login") || path.equals("/api/auth/register")){
            filterchain.doFilter(request, response);
            return;
        }


        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String authHeader = httpRequest.getHeader("Authorization");

        if(authHeader == null || authHeader.isEmpty()){
            // Send error response.
            ((HttpServletResponse) response).sendError(HttpServletResponse.SC_UNAUTHORIZED, "Missing Authorization header.");
            return;
        }

        // Checking if there is a token and if it starts with "Bearer"
        String bearer = authHeader.split(" ")[0];
        String token = authHeader.split(" ")[1];

        if(authHeader.isEmpty() || !bearer.equals("Bearer") || token.isEmpty()) {
            // Send error response.
            ((HttpServletResponse) response).sendError(HttpServletResponse.SC_UNAUTHORIZED, "Missing or invalid Authorization header.");
            return;
        }


        // Checking if the token is valid
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(token)
                    .getBody();

            // Checking if the token is expired
            if(claims.getExpiration().before(new java.util.Date(System.currentTimeMillis()))) {
                // Send error response.
                ((HttpServletResponse) response).sendError(HttpServletResponse.SC_UNAUTHORIZED, "Expired token.");
                return;
            }
        } catch (Exception e) {
            // Send error response.
            ((HttpServletResponse) response).sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token.");
            return;
        }

        filterchain.doFilter(request, response);
    }

    @Override
    public void init(FilterConfig filterconfig) throws ServletException {}
}
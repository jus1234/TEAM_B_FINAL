package flow.mvc.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

/**
 * @author ������ / 2021. 7. 11. / ���� 9:06:16
 */
@Component
@Aspect
public class Advice {

	private void printParam(ProceedingJoinPoint pjp) {
		Object[] param = pjp.getArgs();
		if (param.length != 0) {
			int length = param.length;
			for (int i = 0; i < length; i++) {
				System.out.println((i+1)+"��° param: "+param[i]);
			}
		}
	}

	@Around(value = "execution(* flow.mvc.controller.*.*.*(..))")
	public Object logAdvice(ProceedingJoinPoint pjp) throws Throwable {
		// MethodInvocation�� ���� �޼��� ����, Ÿ�� ������Ʈ�� ���� ���� �� ���ִ�
		String methodName = pjp.getSignature().getName();
		System.out.println("======================================");
		System.out.println("[LOG]  METHOD  : " + methodName + " is calling.");
		printParam(pjp);
		Object rev = pjp.proceed();
		if (rev != null) {
			System.out.println("rev : " + rev);
		}
		printParam(pjp);
		System.out.println("[LOG]  METHOD  : " + methodName + " was called.");
		System.out.println("======================================");
		return rev;
	}
}
